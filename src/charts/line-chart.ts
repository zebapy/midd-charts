import { select } from 'd3-selection';
import {
  scaleBand,
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  scaleSequential
} from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max, extent } from 'd3-array';
import { line as d3line } from 'd3-shape';

import { createBaseChart } from './base-chart';

import { prepareData } from './utils';

class LineChart {
  constructor(selector, options) {
    const {
      svg,
      width,
      height,
      margin,
      colors,
      data,
      labels,
      colorScale
    } = createBaseChart(selector, options);

    const x = scalePoint()
      .domain(labels)
      .rangeRound([0, width]);

    const y = scaleLinear()
      .domain([0, max(data, d => max(d))])
      .rangeRound([height, 0]);

    const line = d3line()
      .x((d, i) => x(labels[i]))
      .y(d => y(d));

    function renderLine(series, index) {
      const color = colorScale(index);

      svg
        .append('path')
        .data([series])
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .attr('d', line);

      svg
        .selectAll('.dot')
        .data(series)
        .enter()
        .append('circle')
        .attr('class', `dot-${index}`)
        .attr('fill', color)
        .attr('cx', (d, i) => x(labels[i]))
        .attr('cy', d => y(d))
        .attr('r', 4);
    }

    data.forEach((series, i) => {
      renderLine(series, i);
    });

    svg
      .append('g')
      .classed('axis x', true)
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x));

    svg
      .append('g')
      .classed('axis y', true)
      .call(axisLeft(y));
  }
}

export default LineChart;
