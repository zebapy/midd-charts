import { range } from 'd3-array';

import {
  BarChart,
  HorizontalBarChart,
  LineChart,
  HorizontalSingleBarChart,
  PieChart
} from './charts';

/*
charts have 3 data key variations depending on the outcome you want

1. a normal bar chart with a single series

data: [1,2,3,4,5]

2. a series of groups

data: [
  [1,2,3], 
  [1,2,3],
  [2,5,3]
]

3. a series of groups with labels for a legend

data: [
  { label: 'group 1', data: [1,2,3] },
  { label: 'group 2', data: [1,2,3] },
  { label: 'group 3', data: [1,2,3] },
]

*/

const barchart = new BarChart('#midd-barchart', {
  data: {
    datasets: [
      {
        label: 'dataset 1',
        data: [41, 14, 4, 10, 4, 18, 2, 4, 1, 2]
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
  yLabel: 'Percentage of people',
  yTickFormat: tick => tick + '%'
});

const groupbarchart = new BarChart('#midd-groupbarchart', {
  data: {
    datasets: [
      {
        label: 'lorem medium length',
        data: range(4).map(x => Math.random() * 1000)
      },
      {
        label: 'ipsum a longer legend title',
        data: range(5).map(x => Math.random() * 1000)
      },
      { label: 'dolor', data: range(5).map(x => Math.random() * 1000) }
    ],
    labels: [2012, 2014, 2016, 2018, 2020]
  },
  yLabel: 'Department',
  xLabel: 'Years'
});

// const xbarchart = new HorizontalBarChart('#midd-xbarchart', {
//   data: [41, 14, 4, 10, 4, 18, 2, 4, 1, 2],
//   labels: [
//     'Administration',
//     'Advising / Counseling',
//     'Analyst/Research',
//     'Communications/Marketing/PR',
//     'Management/Strategic Planning',
//     'Operations/Project Management',
//     'Sales / Account Management',
//     'Teaching/Training',
//     'Translation / Interpretation',
//     'Other'
//   ],
//   yLabel: 'Department',
//   xLabel: 'Percentage of people'
// });

// const linechart = new LineChart('#midd-linechart', {
//   data: range(5).map(x => Math.random() * 100),
//   labels: [2012, 2014, 2016, 2018, 2020],
//   // TODO: rename xLabel/yLabel
//   yLabel: 'Department',
//   xLabel: 'Years'
// });

// const multilinechart = new LineChart('#midd-multilinechart', {
//   data: [
//     {
//       label: 'lorem medium length',
//       data: range(4).map(x => Math.random() * 1000)
//     },
//     {
//       label: 'ipsum a longer legend title',
//       data: range(5).map(x => Math.random() * 1000)
//     },
//     { label: 'dolor', data: range(5).map(x => Math.random() * 1000) }
//   ],
//   labels: [2012, 2014, 2016, 2018, 2020],
//   yLabel: 'Department',
//   xLabel: 'Years'
// });

// // TODO: allow single number for data
// const xsinglebar = new HorizontalSingleBarChart('#midd-xsinglebarchart', {
//   data: [
//     { label: 'lorem medium length', data: [134] },
//     { label: 'ipsum a longer legend title', data: [80] },
//     { label: 'dolor', data: [24] }
//   ]
// });

// const piechart = new PieChart('#midd-pie', {
//   data: [
//     { label: 'lorem medium length', data: [134] },
//     { label: 'ipsum a longer legend title', data: [80] },
//     { label: 'dolor', data: [24] }
//   ]
// });

// const donutChart = new PieChart('#midd-donut', {
//   data: [
//     { label: 'lorem medium length', data: [134] },
//     { label: 'ipsum a longer legend title', data: [80] },
//     { label: 'dolor', data: [24] },
//     { label: 'dolor', data: [24] },
//     { label: 'ipsum', data: [29] },
//     { label: 'dolor', data: [24] },
//     { label: 'set', data: [28] },
//     { label: 'dolor', data: [24] },
//     { label: 'dolor', data: [31] },
//     { label: 'dolor', data: [41] }
//   ],
//   donut: true
// });
