import { line, Line, curveBasis } from 'd3-shape';

import { ScatterChart } from './scatter-chart';

export class LineChart extends ScatterChart {
  lineGenerator: Line<any>;

  draw() {
    this.lineGenerator = line()
      .x(
        (d, i) =>
          this.x(this.displayData.labels[i]) +
          // split by step so we dont have to use scalePoint
          this.x.step() / 2
      )
      .y((d: any) => this.y(d));

    const gLines = this.innerWrap
      .selectAll('g.lines')
      .data(this.displayData.datasets)
      .enter()
      .append('g')
      .classed('lines', true);

    gLines
      .append('path')
      .attr('stroke', d => this.getFillColor(d.label))
      .datum(d => d.data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('d', this.lineGenerator);

    super.draw();
  }
}
