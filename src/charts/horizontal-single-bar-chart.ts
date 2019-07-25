import { sum } from 'd3-array';
import { transition } from 'd3-transition';

import { BaseChart } from './base-chart';

import { ChartType, SingleBarChartOptions } from './config';

export class HorizontalSingleBarChart extends BaseChart {
  options: SingleBarChartOptions;

  constructor(selector, options) {
    super(selector, options);

    this.options.type = ChartType.SINGELBAR;
  }

  initialDraw() {
    this.setSVG();

    this.draw();
  }

  draw() {
    const total = sum(this.displayData.datasets, d => sum(d.data));

    const { height } = this.getChartSize();

    const bar = this.innerWrap
      .selectAll('g.bargroup')
      .data(this.displayData.datasets)
      .enter()
      .append('g')
      .attr('class', 'bargroup');

    let percSoFar = 0;

    const getPercent = d => (d / total) * 100;

    const getBarWidth = d => {
      const prevPerc = percSoFar;
      const thisPerc = getPercent(d);
      percSoFar = percSoFar + thisPerc;
      return Math.floor(prevPerc) + '%';
    };

    bar
      .datum(d => d.data)
      .append('rect')
      .attr('height', height)
      .attr('x', getBarWidth)
      .attr('fill', (d, i) => this.getFillColor(i))
      .attr('width', d => getPercent(d) + '%');

    percSoFar = 0;

    // add percentage labels
    bar
      .append('text')
      .attr('x', getBarWidth)
      .attr('y', height + 16)
      .text(d => Math.floor(getPercent(d)) + '%');
  }
}
