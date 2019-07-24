import { pie as d3pie, arc as d3arc } from 'd3-shape';

import { createBaseChart } from './base-chart';

// pie is also donut?
class PieChart {
  constructor(selector, { donut = false, ...options }) {
    const { svg, margin, height, width, colorScale, data } = createBaseChart(
      selector,
      options
    );

    const radius = Math.min(width, height) / 2;
    const innerRadius = Math.min(width, height) / 2.5;

    const pie = d3pie().value(d => d);

    const arc = d3arc()
      .innerRadius(donut ? innerRadius : 0)
      .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .append('g')
      .classed('pie', true)
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .selectAll('.pie-paths')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colorScale(i));
  }
}

export default PieChart;
