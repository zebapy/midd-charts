import { select, selectAll } from 'd3-selection';
import {
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  ScaleOrdinal,
  ScaleBand,
  ScaleLinear
} from 'd3-scale';
import { min, max } from 'd3-array';

import { colors, options, BaseChartOptions } from './config';

import { findNode } from './utils';

class BaseChart {
  svg: any;
  colorScale: ScaleOrdinal<any, any>;

  holder: Element;

  constructor(selector: string, options: BaseChartOptions = options.BASE) {
    this.colorScale = scaleOrdinal().range(colors);

    this.holder = findNode(selector);

    this.setData(options.data);
  }

  setData(data) {
    this.displayData = {
      data,
      keys: data.map(dataset => dataset.label),
      labels: data.labels
    };

    this.draw();
  }

  setSVG() {
    this.svg = select(this.holder).append('svg');
  }

  draw() {
    this.beforeDraw();
  }

  beforeDraw() {
    console.warn('implement your own beforeDraw()');
  }
}

class AxisChart extends BaseChart {
  x: ScaleBand<string>;
  y: ScaleLinear<string, string>;

  constructor(selector, config) {
    super(selector, config);
  }

  beforeDraw() {}
}

export class BarChart extends AxisChart {}
