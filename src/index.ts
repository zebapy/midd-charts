import { range } from 'd3-array';

import {
  BarChart,
  HorizontalBarChart,
  ScatterChart,
  LineChart,
  HorizontalSingleBarChart,
  PieChart
} from './charts';

const random = (x = 10, max = 1000) => range(x).map(n => Math.random() * max);

const barchart = new BarChart('#midd-barchart', {
  data: {
    datasets: [
      {
        label: 'dataset 1',
        data: random(10)
      }
    ],
    labels: [
      'Administration',
      'Advising / Counseling',
      'Analyst/Research',
      'Communications/Marketing/PR',
      'Management/Strategic Planning',
      'Operations/Project Management',
      'Sales / Account Management',
      'Teaching/Training',
      'Translation / Interpretation',
      'Other'
    ]
  },
  yLabel: 'Percentage of people'
  // yTickFormat: tick => tick + '%'
});

const groupbarchart = new BarChart('#midd-groupbarchart', {
  data: {
    datasets: [
      {
        label: 'lorem medium length',
        data: random(5)
      },
      {
        label: 'ipsum a longer legend title',
        data: random(5)
      },
      { label: 'dolor', data: random(5) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  yLabel: 'Department',
  xLabel: 'Years'
});

const xbarchart = new HorizontalBarChart('#midd-xbarchart', {
  data: {
    datasets: [
      {
        data: [41, 14, 4, 10, 4, 18, 2, 4, 1, 2],
        label: 'dataset 1'
      }
    ],
    labels: [
      'Administration',
      'Advising / Counseling',
      'Analyst/Research',
      'Communications/Marketing/PR',
      'Management/Strategic Planning',
      'Operations/Project Management',
      'Sales / Account Management',
      'Teaching/Training',
      'Translation / Interpretation',
      'Other'
    ]
  },
  yLabel: 'Department',
  xLabel: 'Percentage of people'
});

const groupxbarchart = new HorizontalBarChart('#midd-xgroupbarchart', {
  data: {
    datasets: [
      {
        label: 'Digital Services',
        data: random(5)
      },
      {
        label: 'Print services',
        data: random(5)
      },
      { label: 'News room', data: random(5) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  yLabel: 'Years',
  xLabel: 'Projects'
});

const scatterchart = new ScatterChart('#midd-scatterchart', {
  data: {
    datasets: [
      { label: 'dataset 1', data: range(5).map(x => Math.random() * 100) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  // TODO: rename xLabel/yLabel
  yLabel: 'Department',
  xLabel: 'Years'
});

const groupscatterchart = new ScatterChart('#midd-groupscatterchart', {
  data: {
    datasets: [
      { label: 'lorem medium length', data: random(5) },
      { label: 'ipsum a longer legend title', data: random(5) },
      { label: 'dolor', data: random(5) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  // TODO: rename xLabel/yLabel
  yLabel: 'Department',
  xLabel: 'Years'
});

const linechart = new LineChart('#midd-linechart', {
  data: {
    datasets: [
      { label: 'dataset 1', data: range(5).map(x => Math.random() * 100) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  // TODO: rename xLabel/yLabel
  yLabel: 'Department',
  xLabel: 'Years'
});

const multilinechart = new LineChart('#midd-multilinechart', {
  data: {
    datasets: [
      { label: 'lorem medium length', data: random(5) },
      { label: 'ipsum a longer legend title', data: random(5) },
      { label: 'dolor', data: random(5) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  yLabel: 'Department',
  xLabel: 'Years'
});

// TODO: allow single number for data
// const xsinglebar = new HorizontalSingleBarChart('#midd-xsinglebarchart', {
//   data: {
//     labels: ['lorem', 'ipsum', 'dolor'],
//     datasets: [{ label: 'dataset 1', data: [134, 80, 24] }]
//   }
// });

const piechart = new PieChart('#midd-pie', {
  data: {
    labels: ['lorem', 'ipsum', 'dolor', 'eggs'],
    datasets: [{ label: 'dataset 1', data: [134, 14, 24, 52] }]
  }
});

const donutChart = new PieChart('#midd-donut', {
  donut: true,
  data: {
    labels: ['lorem', 'ipsum', 'dolor', 'set', 'bacon'],
    datasets: [{ label: 'dataset 1', data: [134, 234, 282, 522, 563] }]
  }
});
