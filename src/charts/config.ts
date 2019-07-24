export interface DataSet {
  label: string;
  data: Array<any>;
}

export interface MarginOption {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface ChartData {
  labels: Array<string>;
  datasets: Array<DataSet>;
}

export interface BaseChartOptions {
  keys?: Array<string>;
  width?: number;
  height?: number;
  margin?: MarginOption;
  data: ChartData;
  colors?: Array<string>;
  containerResizable?: Boolean;
}

export interface AxisChartOptions extends BaseChartOptions {
  xLabel?: String;
  yLabel?: String;
  xTickFormat?: Function;
  yTickFormat?: Function;
  xPadding?: Number;
  yPadding?: Number;
}

const colorMap = {
  navy: '#0d395f',
  teal: '#1f9f8b',
  orange: '#c26533',
  green: '#8F9A17',
  yellow: '#C26533',
  sun: '#F4B824',
  maroon: '#763649',
  calico: '#D3B885',
  harvest: '#907036'
};

export const colors = Object.values(colorMap);

const defaultMargin = {
  top: 32,
  right: 32,
  left: 32,
  bottom: 32
};

const baseOptions: BaseChartOptions = {
  width: 640,
  height: 400,
  margin: defaultMargin,
  data: {
    datasets: [],
    labels: []
  },
  colors,
  containerResizable: true
};

const axisOptions: AxisChartOptions = {
  ...baseOptions,
  xPadding: 8,
  yPadding: 8
};

export const options = {
  BASE: baseOptions,
  AXIS: axisOptions
};
