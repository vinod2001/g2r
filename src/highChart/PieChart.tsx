import * as React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Box from "@mui/material/Box";

export const PieChart: React.FC = () => {
 const colors = ['#5B8FF9', '#FF9D4D', '#EC5A5F', '#41D067', '#008F89'];
 const innerSize = ['50%', '0']
  const chartOptions: any = {
    chart: {
      plotBackgroundColor: "",
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie',
      height: (9 / 16 * 100) + '%'
  },
  title: {
      text: '',
      align: 'left'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  colors: colors,
  series: [{
      name: 'Brands',
      colorByPoint: true,
      innerSize: innerSize[Math.floor(Math.random()*innerSize.length)],
      data: [{
          name: 'Chrome',
          y: 70.67,
          sliced: true,
          selected: true,
      }, {
          name: 'Edge',
          y: 14.77
      },  {
          name: 'Firefox',
          y: 4.86
      }, {
          name: 'Safari',
          y: 2.63
      }, {
          name: 'Internet Explorer',
          y: 1.53
      },  {
          name: 'Opera',
          y: 1.40
      }, {
          name: 'Sogou Explorer',
          y: 0.84
      }, {
          name: 'QQ',
          y: 0.51
      }, {
          name: 'Other',
          y: 2.6
      }]
  }],
  };

  return (
    <>
    <Box sx={{width:'75%', height:'75%'}}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </Box>
    </>
  );

}