import { BaseAxisChart } from './base-axis-chart';
import { ChartType, ScatterChartOptions } from './config';

export class ScatterChart extends BaseAxisChart {
  options: ScatterChartOptions;

  constructor(selector, options) {
    super(selector, options);
    this.options.type === ChartType.SCATTER;
  }

  addLabelsToDataPoints(d) {
    // overwrite add labels to points
    const { labels } = this.displayData;

    return d.data.map((datum, i) => ({
      label: labels[i],
      datasetLabel: d.label,
      value: datum
    }));
  }

  draw() {
    const gDots = this.innerWrap
      .selectAll('g.dots')
      .data(this.displayData.datasets)
      .enter()
      .append('g')
      .classed('dots', true);

    gDots
      .selectAll('circle.dot')
      .data(d => this.addLabelsToDataPoints(d))
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => this.x(d.label) + this.x.step() / 2)
      .attr('cy', d => this.y(d.value))
      .attr('r', 4)
      .attr('fill', d => this.getFillColor(d.datasetLabel));
  }
}
