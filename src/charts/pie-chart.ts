import { select } from 'd3-selection';
import { pie, arc, Pie, Arc } from 'd3-shape';
import { BaseChart } from './base-chart';

import { PieChartOptions, ChartType, DataSet, ChartData } from './config';

export interface PieDatum {
  label: string;
  value: number;
}

export interface PieDataSet extends DataSet {
  data: Array<PieDatum>;
}

export interface PieData {
  labels: Array<string>;
  datasets: Array<PieDataSet>;
}

function convertValueToPercentage(item, fullData) {
  return (
    Math.floor(
      (item / fullData.reduce((accum, val) => accum + val.value, 0)) * 100
    ) + '%'
  );
}

// pie is also donut?
export class PieChart extends BaseChart {
  pie: Pie<PieChart, any>;
  arc: Arc<PieChart, any>;
  path: any;

  options: PieChartOptions;

  constructor(selector, options) {
    super(selector, options);
    this.options.type = options.donut ? ChartType.DONUT : ChartType.PIE;
  }

  initialDraw() {
    this.setSVG();
    this.draw();
  }

  processData(dataObject: ChartData): PieData {
    if (dataObject.datasets.length > 1) {
      console.warn(
        'Currently the Pie and Donut charts support a single dataset, you appear to have more than that. Will only use your first provided dataset.'
      );
    }

    const dataList: Array<any> = dataObject.datasets[0].data.map(
      (datum, i) => ({
        label: dataObject.labels[i],
        value: datum
      })
    );

    // sort data largest to smallest
    const sortedData = dataList.sort((a, b) => b.value - a.value);

    return {
      // Sort labels based on the order made above
      labels: sortedData.map(datum => datum.label),
      datasets: [
        {
          label: dataObject.datasets[0].label,
          data: sortedData
        }
      ]
    };
  }

  private computeRadius(): number {
    const chartSize: any = this.getChartSize();
    const radius: number = Math.min(chartSize.width, chartSize.height) / 2;

    return radius;
  }

  draw() {
    const dataList = this.displayData.datasets[0].data;

    // const chartSize = this.getChartSize(this.container);
    const chartSize = { width: 400, height: 400 };
    const diameter = Math.min(chartSize.width, chartSize.height);
    const radius: number = diameter / 2;

    this.svg.attr('width', `${diameter}px`).attr('height', `${diameter}px`);

    this.innerWrap
      .attr('transform', `translate(${radius},${radius})`)
      .attr('width', `${diameter}px`)
      .attr('height', `${diameter}px`)
      .attr('preserveAspectRatio', 'xMinYMin');

    // Compute the correct inner & outer radius
    const marginedRadius = this.computeRadius();
    this.arc = arc()
      .innerRadius(this.options.donut ? marginedRadius * (5 / 6) : 0)
      .outerRadius(marginedRadius);

    this.pie = pie().value((d: any) => d.value);
    // .sort(null);

    // Draw the slices
    this.path = this.innerWrap
      .selectAll('path')
      .data(this.pie(dataList))
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', (d, i) => this.getFillColor(this.displayData.labels[i]));

    // Draw the slice labels
    const self = this;
    this.innerWrap
      .selectAll('text.chart-label')
      .data(this.pie(dataList), (d: any) => d.data.label)
      .enter()
      .append('text')
      .classed('chart-label', true)
      .attr('dy', '.1em')
      .style('text-anchor', 'middle')
      .text(d => convertValueToPercentage(d.data.value, dataList))
      .attr('transform', function(d) {
        return self.deriveTransformString(this, d, radius);
      });
  }

  deriveTransformString(element, d, radius) {
    const textLength = element.getComputedTextLength();
    const textOffsetX = textLength / 2;
    const textOffsetY = parseFloat(getComputedStyle(element).fontSize) / 2;

    const marginedRadius = radius + 5;

    const theta = (d.endAngle - d.startAngle) / 2 + d.startAngle;
    const xPosition = (textOffsetX + marginedRadius) * Math.sin(theta);
    const yPosition = (textOffsetY + marginedRadius) * -Math.cos(theta);

    return `translate(${xPosition}, ${yPosition})`;
  }
}
