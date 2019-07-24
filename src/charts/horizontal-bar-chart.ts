import { select } from 'd3-selection';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { max } from 'd3-array';

import { createBaseChart } from './base-chart';

// TODO: auto set left margin based on yaxis label widths
class HorizontalBarChart {
  constructor(selector, options) {
    const {
      svg,
      width,
      height,
      margin,
      data,
      labels,
      colorScale,
      setMargin
    } = createBaseChart(selector, options);

    const x = scaleLinear()
      .domain([0, max(data, d => max(d))])
      .rangeRound([0, width]);

    const y = scaleBand()
      .domain(labels)
      .rangeRound([height, 0])
      .padding(0.6);

    const xAxis = axisBottom(x);

    const yAxis = axisLeft(y);

    const yTicks = svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.append('g').call(yAxis);

    function renderBars(series, index) {
      const color = colorScale(index);

      svg
        .selectAll('.bar' + index)
        .data(series)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('fill', color)
        .attr('x', d => y(d))
        .attr('y', (d, i) => y(labels[i]))
        .attr('height', y.bandwidth())
        .attr('width', d => x(d));
    }

    data.forEach(renderBars);
  }
}

export default HorizontalBarChart;
