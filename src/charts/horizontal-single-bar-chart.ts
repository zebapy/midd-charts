import { sum } from 'd3-array';
import { transition } from 'd3-transition';

import { createBaseChart } from './base-chart';

class HorizontalSingleBarChart {
  constructor(selector, options) {
    const { svg, data, colorScale, height } = createBaseChart(selector, {
      ...options,
      margin: {
        left: 0,
        top: 0,
        right: 0
      },
      height: 32
    });

    const total = sum(data);

    const bar = svg
      .selectAll('.bargroup')
      .data(data)
      .enter()
      .append('g');

    const getPercent = d => (d / total) * 100;

    let percSoFar = 0;
    const getBarWidth = d => {
      const prevPerc = percSoFar;
      const thisPerc = getPercent(d);
      percSoFar = percSoFar + thisPerc;
      return Math.floor(prevPerc) + '%';
    };

    bar
      .append('rect')
      .attr('height', height)
      .attr('x', getBarWidth)
      .attr('fill', (d, i) => colorScale(i))
      .attr('width', d => getPercent(d) + '%');

    percSoFar = 0;
    bar
      .append('text')
      .attr('x', getBarWidth)
      .attr('y', height + 16)
      .text(d => Math.floor(getPercent(d)) + '%');
  }
}

export default HorizontalSingleBarChart;
