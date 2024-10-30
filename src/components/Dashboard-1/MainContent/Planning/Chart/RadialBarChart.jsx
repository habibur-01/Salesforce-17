import React from "react";
import Chart from "react-apexcharts";

const RadialBarChart = () => {
  const options = {
    chart: {
      height: 280,
      type: "radialBar",
      offsetY: 0,
    },
    series: [70], // Only the main percentage value
    colors: ["#20E647"], // 70% green
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          background: "#2196F3", // Background color set to 30% blue
        },
        track: {
          background: "#333",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
            formatter: () => "70% ", // Display both percentages in the center
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="radialBar"
        height={280}
      />
    </div>
  );
};

export default RadialBarChart;
