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

  maxBarWidth: number;

  constructor(selector, options) {
    super(selector, options);

    this.maxBarWidth = 32;
  }

  draw() {
    // this.innerWrap.style('width', '100%').style('height', '100%');

    const { innerWidth, innerHeight, height } = this.getChartSize();

    // create the inner wrap to hold the bars
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
      .attr('transform', d => `translate(${this.x(d)}, 0)`)

      // create each bar within the groups
      .selectAll('rect.bar')
      .data((d, index) => this.addLabelsToDataPoints(d, index))
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', this.getBarX.bind(this))
      .attr('y', d => this.y(Math.max(0, d.value)))
      .attr('width', this.x1.bandwidth())
      .attr('height', d => Math.abs(height - this.y(d.value)))
      .attr('fill', d => this.getFillColor(d.datasetLabel));
  }

  setXScale() {
    // const { bar: margins } = Configuration.charts.margin;
    const { innerWidth: width } = this.getChartSize();

    // create the main scale which aligns bars with labels below
    this.x = scaleBand()
      .rangeRound([0, width])
      .domain(this.displayData.labels)
      .padding(0.2);

    // create the 2nd scale used for grouped bars
    this.x1 = scaleBand()
      .domain(this.displayData.datasets.map(dataset => dataset.label))
      .rangeRound([0, getMaxBarWidth(this.maxBarWidth, this.x.bandwidth())]);

    // if it's a grouped bar, use additoinal padding so the bars don't group up
    if (this.displayData.datasets.length > 1) {
      this.x1.padding(0.1);
    }
  }

  resizeChart() {
    console.log('resize');
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
    const max = this.maxBarWidth;

    if (!isWidthConstrained(max, this.x.bandwidth())) {
      return this.x1(d.datasetLabel);
    }

    return this.x.bandwidth() / 2 - max / 2;
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
