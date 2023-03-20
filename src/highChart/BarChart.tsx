import * as React from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export const BarChart: React.FC = () => {

  const chartOptions: Options = {
    chart: {
      type: "column"
    },
    title: {
      text: "Highcharts/React/Typescript"
    },
    series: [
      {
        // `type: column` is required for type-checking this options as a column series
        type: "column",
        data: [1, 2, 3]
      }
    ],
    xAxis: {
      categories: ["Foo", "Bar", "Baz"],
      labels: {
        useHTML: true,
        formatter: () => ""
      }
    }
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </>
  );

}