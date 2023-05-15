import * as React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export const BarChart: React.FC = () => {
  const colors = ['#5B8FF9', '#FF9D4D', '#EC5A5F', '#41D067', '#008F89'];
  const type = ['column','bar']
  const name = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
    let chartOptions: any = {
      chart: {
        type: type[Math.floor(Math.random()*type.length)]
      },
      title: {
        text: "Highcharts/React/Typescript"
      },
      series: [],
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
        // labels: {
        //   useHTML: true,
        //   formatter: () => ""
        // }
      },
      colors:colors
    };
  
    for (let i = 0; i < 5; i++) {
      let seriesData = {
        data: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100)
        ],
        name:name[i]
      };
      chartOptions.series.push(seriesData);
    }

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </>
  );

}