import { select } from 'd3-selection';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  ScaleBand,
  ScaleLinear
} from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';

import { BaseAxisChart } from './base-axis-chart';

// TODO: auto set left margin based on yaxis label widths
export class HorizontalBarChart extends BaseAxisChart {
  // constructor(selector, options) {
  //   const {
  //     svg,
  //     width,
  //     height,
  //     margin,
  //     data,
  //     labels,
  //     colorScale,
  //     setMargin
  //   } = createBaseChart(selector, options);

  y: ScaleBand<string>;
  y1: ScaleBand<string>;
  x: ScaleLinear<any>;

  setXScale() {
    const { width } = this.getChartSize();
    this.x = scaleLinear()
      .domain([0, this.getYMax()])
      .rangeRound([0, width]);
  }

  setYScale() {
    const { height } = this.getChartSize();

    // create the main scale which aligns bars with labels below
    this.y = scaleBand()
      .rangeRound([0, height])
      .domain(this.displayData.labels)
      .padding(0.2);

    // create the 2nd scale used for grouped bars
    this.y1 = scaleBand()
      .domain(this.options.keys)
      .rangeRound([
        0,
        this.getMaxBarWidth(this.maxBarWidth, this.y.bandwidth())
      ]);

    // if it's a grouped bar, use additoinal padding so the bars don't group up
    if (this.displayData.datasets.length > 1) {
      this.y1.padding(0.1);
    }

    // const xAxis = axisBottom(x);

    // const yAxis = axisLeft(y);

    // const yTicks = svg
    //   .append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(xAxis);

    // svg.append('g').call(yAxis);
  }

  draw() {
    const { height, width } = this.getChartSize();

    const gBars = this.innerWrap
      // .attr('transform', `translate(${margins.left}, ${margins.top})`)
      .append('g')
      .classed('bars', true);
    // .attr('width', innerWidth);

    gBars
      .selectAll('g')
      .data(this.displayData.labels)
      .enter()
      .append('g')

      // position each group of bars (or single bar) aligned with x axis labels
      .attr('transform', d => `translate(0, ${this.y(d)})`)

      // create each bar within the groups
      .selectAll('rect.bar')
      .data((d, index) => this.addLabelsToDataPoints(d, index))
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => this.y(Math.max(0, d.value)))
      .attr('y', d => this.getBarPosition(d, this.y, this.y1))
      .attr('width', d => this.x(d.value))
      .attr('height', this.y1.bandwidth())
      .attr('fill', d => this.getFillColor(d.datasetLabel));

    // this.svg
    //   .selectAll('.bar' + index)
    //   .data(this.displayData.labels)

    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('fill', color)
    //   .attr('x', d => y(d))
    //   .attr('y', (d, i) => y(labels[i]))
    //   .attr('height', y.bandwidth())
    //   .attr('width', d => x(d));
  }
}

export default HorizontalBarChart;
