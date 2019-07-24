import { select } from 'd3-selection';
import { scaleBand, ScaleBand } from 'd3-scale';

import { BaseAxisChart } from './base-axis-chart';

// returns the configured max width or the calculated bandwidth
// whichever is lower
// defaults to the calculated bandwidth if no maxWidth is defined
const getMaxBarWidth = (maxWidth, currentBandWidth) => {
  if (!maxWidth) {
    return currentBandWidth;
  }
  if (currentBandWidth <= maxWidth) {
    return currentBandWidth;
  }
  return maxWidth;
};

const isWidthConstrained = (
  maxWidth: number,
  currentBandWidth: number
): boolean => {
  if (!maxWidth) {
    return false;
  }
  if (currentBandWidth <= maxWidth) {
    return false;
  }
  return true;
};

export class BarChart extends BaseAxisChart {
  // constructor(selector, options) {
  // super(selector, options);
  // const xSub = scaleBand().rangeRound([0, x.bandwidth()]);
  // }

  x1: ScaleBand<any>;

  draw() {
    this.innerWrap.style('width', '100%').style('height', '100%');

    const margins = this.options.margin;

    const chartSize = this.getChartSize();
    const width = chartSize.width - margins.left - margins.right;
    const height = chartSize.height - this.getBBox('.x.axis').height;

    const gBars = this.innerWrap
      .attr('transform', `translate(${margins.left}, ${margins.top})`)
      .append('g')
      .classed('bars', true)
      .attr('width', width);

    gBars
      .selectAll('g')
      .data(this.displayData.labels)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${this.x(d)}, 0)`)
      .selectAll('rect.bar')
      .data((d, index) => {
        const data = this.addLabelsToDataPoints(d, index);
        return data;
      })
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', this.getBarX.bind(this))
      .attr('y', d => this.y(Math.max(0, d.value)))
      .attr('width', this.x1.bandwidth())
      .attr('height', d => Math.abs(this.y(d.value) - this.y(0)))
      .attr('fill', d => this.getFillColor(d.datasetLabel));

    // .attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null)
    // .attr("stroke-width", Configuration.bars.default.strokeWidth)
    // .attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);

    // this.displayData.datasets.forEach((dataset, index) => {
    //   const color = this.colorScale(index);

    //   const { height } = this.getChartSize();

    //   const bars = this.innerWrap.append('g').attr('class', 'bars');

    //   bars
    //     .selectAll('.bar' + index)
    //     .data(dataset.data)
    //     .enter()
    //     .append('rect')
    //     .attr('class', 'bar')
    //     .attr('fill', color)
    //     .attr('x', this.getBarX.bind(this))
    //     .attr('y', d => this.y(d))
    //     .attr('width', this.x.bandwidth())
    //     .attr('height', d => height - this.y(d));
    // });
  }

  setXScale() {
    // const { bar: margins } = Configuration.charts.margin;
    const { left, right } = this.options.margin;
    const chartSize = this.getChartSize();
    const width = chartSize.width - left - right;

    this.x = scaleBand().rangeRound([0, width]);
    // .padding(Configuration.bars.spacing.datasets);
    this.x.domain(this.displayData.labels);

    // if it's a grouped bar, use additoinal padding so the bars don't group up
    if (this.displayData.datasets.length > 1) {
      this.x1 = scaleBand()
        .rangeRound([0, width])
        .padding(4);
    } else {
      this.x1 = scaleBand().rangeRound([0, width]);
    }

    this.x1
      .domain(this.displayData.datasets.map(dataset => dataset.label))
      .rangeRound([0, getMaxBarWidth(32, this.x.bandwidth())]);
  }

  resizeChart() {
    const actualChartSize: any = this.getChartSize(this.container);
    const dimensionToUseForScale = Math.min(
      actualChartSize.width,
      actualChartSize.height
    );

    // Resize the SVG
    select(this.holder)
      .select('svg')
      .attr('width', `${dimensionToUseForScale}px`)
      .attr('height', `${dimensionToUseForScale}px`);

    // this.updateXandYGrid(true);

    // Scale out the domains
    this.setXScale();
    this.setYScale();

    // Set the x & y axis as well as their labels
    this.setXAxis();
    this.setYAxis();

    // Apply new data to the bars
    // const g = this.innerWrap.selectAll('g.bars g');
    this.redrawBars();

    super.resizeChart();
  }

  getBarX(d) {
    const maxWidth = null;
    if (!isWidthConstrained(maxWidth, this.x.bandwidth())) {
      return this.x1(d.datasetLabel);
    }

    return this.x.bandwidth() / 2 - 32 / 2;
  }

  redrawBars() {
    const rect = this.innerWrap.selectAll('rect.bar');

    // Update existing bars
    rect
      .attr('x', this.getBarX.bind(this))
      .attr('y', d => this.y(Math.max(0, d.value)))
      .attr('width', this.x1.bandwidth())
      .attr('height', d => Math.abs(this.y(d.value) - this.y(0)));
  }
}
