import { select, selectAll } from 'd3-selection';
import { scaleOrdinal, ScaleOrdinal } from 'd3-scale';
import ResizeObserver from 'resize-observer-polyfill';

import { findNode } from './utils';

import * as Config from './config';
import { ChartData, BaseChartOptions } from './config';

const nodeWidth = (n: any) => n.getBBox().width;

export class BaseChart {
  static chartCount = 1;

  id = '';
  chartContainerID = '';

  // Chart element references
  container: any;
  holder: Element;
  svg: any;
  innerWrap: any;

  options: BaseChartOptions = Config.options.BASE;

  // Data
  data: ChartData;
  displayData: ChartData;
  fixedDataLabels;

  colorScale: ScaleOrdinal<any, any>;

  constructor(selector: string | Element, options: BaseChartOptions) {
    this.id = `chart-${BaseChart.chartCount++}`;
    this.options = { ...this.options, ...options };

    this.colorScale = scaleOrdinal().range(this.options.colors);

    // layout/container
    this.holder = findNode(selector);

    const { container } = this.setChartIDContainer();
    this.container = container;

    if (this.options.containerResizable) {
      this.resizeWhenContainerChange();
    }

    this.setData(options.data);
  }

  setChartIDContainer() {
    const parent = select(this.holder);
    let chartId: string;
    let container: any;

    if (parent.select('.chart-wrapper').nodes().length > 0) {
      container = parent.select('.chart-wrapper');
      chartId = container.attr('chart-id');

      // container.selectAll('.chart-svg').remove();
    } else {
      chartId = this.id;
      container = parent.append('div');
      container.attr('chart-id', chartId).classed('chart-wrapper', true);
      // .classed(`carbon--theme--${this.options.theme}`, true);

      // if (container.select('.legend-wrapper').nodes().length === 0) {
      //   const legendWrapper = container
      //     .append('div')
      //     .attr('class', 'legend-wrapper')
      //     .attr('role', 'region')
      //     .attr('aria-label', `Chart ${chartId} Legend`);

      //   legendWrapper.append('ul').attr('class', 'legend');

      // }
    }

    return { chartId, container };
  }

  getFillColor(label: string): string {
    return this.colorScale(label);
  }

  getBBox(selector: any) {
    return this.innerWrap
      .select(selector)
      .node()
      .getBBox();
  }

  setData(data: any) {
    this.displayData = data;

    this.options.keys = this.getKeysFromData();

    this.initialDraw();

    // this.drawLegend();
  }

  setSVG() {
    const { left, top, right, bottom } = this.options.margin;

    const { width, height } = this.getChartSize();

    this.svg = this.container
      .append('svg')
      .classed('chart-svg', true)
      .attr('width', width + left + right)
      .attr('height', height + top + bottom);

    this.innerWrap = this.svg
      .append('g')
      .classed('inner-wrap', true)
      .attr('transform', `translate(${left},${top})`);
    // .style('width', '100%')
    // .style('height', '100%');

    return this.svg;
  }

  getKeysFromData() {
    return this.displayData.datasets.map(set => set.label);
  }

  getChartSize(container = this.container) {
    const node = container.node();

    const { margin } = this.options;

    const maxWidth = 640;
    const minHeight = 400;
    const width = node.clientWidth <= maxWidth ? node.clientWidth : maxWidth;
    const height = minHeight; // set a fixed height

    return {
      width,
      height,
      innerWidth: width - margin.left - margin.right,
      innerHeight: height - margin.top - margin.bottom
    };
  }

  positionLegend() {
    console.log('TODO: position legend');
  }

  drawLegend() {
    const legend = this.svg.append('g').classed('legend', true);

    const { width, height } = this.getChartSize();

    // create each legend item (group of rect and text)
    const key = legend
      .selectAll('.legend-item')
      .data(this.options.keys)
      .enter()
      .append('g')
      .classed('legend-item', true);

    // append the box with color
    key
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 16)
      .attr('height', 8)
      .attr('fill', (d, i) => this.colorScale(i));

    // add text label
    key
      .append('text')
      .text(d => d)
      .attr('x', 20)
      .attr('y', 8);

    // position each legend key offset by last item width
    let offset = 0;
    key.attr('transform', (d, i, nodes) => {
      const node = nodes[i];
      let x = offset;
      offset += nodeWidth(node) + 16;
      return `translate(${x},0)`;
    });

    // position and center the whole legend within the chart
    legend.attr(
      'transform',
      (d, i, nodes) =>
        `translate(${(width - nodeWidth(nodes[i])) / 2}, ${height + 64})`
    );
  }

  initialDraw() {
    console.warn('You should implement your own `draw()` function.');
  }

  resizeChart() {
    console.warn('You should implement your own `resizeChart()` function.');
    this.positionLegend();
  }

  resizeWhenContainerChange() {
    let containerWidth = this.holder.clientWidth;
    let containerHeight = this.holder.clientHeight;

    const resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        if (
          Math.abs(containerWidth - this.holder.clientWidth) > 1 ||
          Math.abs(containerHeight - this.holder.clientHeight) > 1
        ) {
          this.resizeChart();
        }
      }
    });

    // resizeObserver.observe(this.holder);
  }
}
