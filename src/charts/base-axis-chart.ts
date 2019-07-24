import { scaleBand, scaleLinear, ScaleBand, ScaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

import { BaseChart } from './base-chart';

import * as Config from './config';
import { AxisChartOptions } from './config';

export class BaseAxisChart extends BaseChart {
  x: ScaleBand<any>;
  x1: ScaleBand<any>;
  y: ScaleLinear<any, any>;

  options: AxisChartOptions = Config.options.AXIS;

  constructor(selector: string | Element, options: AxisChartOptions) {
    super(selector, options);

    this.options = { ...Config.options.AXIS, ...options };
  }

  setSVG(): any {
    super.setSVG();

    this.container.classed('chart-axis', true);
    this.innerWrap.append('g').attr('class', 'x grid');
    this.innerWrap.append('g').attr('class', 'y grid');

    return this.svg;
  }

  initialDraw() {
    this.setSVG();

    this.setXScale();
    this.setXAxis();

    this.setYScale();
    this.setYAxis();

    // this.drawXLabel();
    // this.drawYLabel();

    this.draw();
  }

  addLabelsToDataPoints(d, index) {
    const { datasets } = this.displayData;

    return datasets.map(dataset => ({
      label: d,
      datasetLabel: dataset.label,
      value: dataset.data[index]
    }));
  }

  drawXGrid() {}

  drawYGrid() {}

  drawXLabel() {
    const { xLabel, margin } = this.options;
    const { height, width } = this.getChartSize();
    if (xLabel) {
      this.innerWrap
        .append('text')
        .classed('label label-x', true)
        .attr('y', height + margin.top + 8)
        .attr('x', width / 2)
        // .attr('dy', '1em')
        // .attr('dx', '1em')
        .attr('text-anchor', 'middle')
        .text(xLabel);
    }
  }

  drawYLabel() {
    const { yLabel, margin } = this.options;

    if (yLabel) {
      this.innerWrap
        .append('text')
        .classed('label label-y', true)
        .attr('y', -margin.top / 2)
        .attr('x', -margin.left)
        // .attr('dy', '1em')
        // .attr('dx', '1em')
        .attr('text-anchor', 'start')
        .text(yLabel);
    }
  }

  setYScale() {
    const { height } = this.getChartSize();

    const yMin = this.getYMin();
    const yMax = this.getYMax();

    this.y = scaleLinear()
      .range([height, 0])
      .domain([Math.min(yMin, 0), yMax]);
  }

  setXScale() {
    const { left, right } = this.options.margin;

    const chartSize = this.getChartSize();
    const width = chartSize.width - left - right;

    this.x = scaleBand()
      .rangeRound([0, width])
      .domain(this.displayData.labels);
  }

  getYMin(): number {
    const { datasets } = this.displayData;
    let yMin;

    if (datasets.length === 1) {
      yMin = min(datasets[0].data);
    } else {
      yMin = min(datasets, (d: any) => min(d.data));
    }

    return yMin;
  }

  getYMax(): number {
    let yMax;

    const { datasets } = this.displayData;

    if (datasets.length === 1) {
      yMax = max(datasets[0].data);
    } else {
      yMax = max(datasets, (d: any) => max(d.data));
    }

    return yMax;
  }

  setXAxis() {
    const xAxis = axisBottom(this.x).tickFormat(this.options.xTickFormat);

    const { innerHeight, height } = this.getChartSize();

    let xAxisRef = this.svg.select('g.x.axis');

    // If the <g class="x axis"> exists in the chart SVG, just update it
    if (xAxisRef.nodes().length > 0) {
      xAxisRef = this.svg
        .select('g.x.axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
    } else {
      xAxisRef = this.innerWrap
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`);

      xAxisRef.call(xAxis);
    }

    xAxisRef.attr('transform', `translate(0, ${height})`);
  }

  setYAxis() {
    // const chartSize = this.getChartSize();
    const yAxis = axisLeft(this.y).tickFormat(this.options.yTickFormat);

    let yAxisRef = this.svg.select('g.y.axis');

    if (yAxisRef.nodes().length > 0) {
      yAxisRef
        // .transition(t)
        // Casting to any because d3 does not offer appropriate typings for the .call() function
        .call(yAxis as any);

      // horizontalLine
      //   .transition(t)
      //   .attr('y1', this.y(0))
      //   .attr('y2', this.y(0))
      //   .attr('x1', 0)
      //   .attr('x2', chartSize.width);
    } else {
      yAxisRef = this.innerWrap.append('g').attr('class', 'y axis');

      yAxisRef.call(yAxis);

      // yAxisRef
      //   .append('line')
      //   .classed('domain', true)
      //   .attr('y1', this.y(0))
      //   .attr('y2', this.y(0))
      //   .attr('x1', 0)
      //   .attr('x2', chartSize.width);
    }

    // this.innerWrap
    //   .append('g')
    //   .attr('class', 'axis y')
    //   .call(yAxis);
  }

  resizeChart() {
    console.warn('You should implement your own `draw()` function.');

    // Reposition the legend
    // this.positionLegend();
  }

  draw() {
    console.warn('You should implement your own `draw()` function.');
  }
}
