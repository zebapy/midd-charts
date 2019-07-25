import { scaleBand, scaleLinear, ScaleBand, ScaleLinear } from 'd3-scale';

import { BaseAxisChart } from './base-axis-chart';
import { HorizontalBarChartOptions, ChartType } from './config';

// TODO: auto set left margin based on yaxis label widths
export class HorizontalBarChart extends BaseAxisChart {
  y: ScaleBand<string>;
  y1: ScaleBand<string>;
  x: ScaleLinear<any, any>;

  options: HorizontalBarChartOptions;

  constructor(selector, options) {
    super(selector, options);

    this.options.type = ChartType.HORIZONTALBAR;
  }

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
  }

  draw() {
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

      // position each group of bars (or single bar) aligned with y axis labels
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
  }
}

export default HorizontalBarChart;
