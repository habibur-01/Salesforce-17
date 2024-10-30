import React from "react";
import Chart from "react-apexcharts";

const DonutChartWithIcon = () => {
  const options = {
    chart: {
      type: "donut",
      toolbar: {
        show: false, // Hide any chart toolbar
      },
    },
    series: [70, 30],
    labels: ["Complete", "Remaining"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%", // Control thickness of the filled part
          labels: {
            show: false,
          },
        },
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#25293C"],
    },
    colors: ["#4CAF50", "#2196F3"], // Customize chart colors
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "70px", // Match the chart's circular area width
        height: "70px", // Match the chart's circular area height
        overflow: "hidden", // Hide any extra space
      }}
    >
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%" // Ensures the chart fills the container precisely
        height="100%" // Ensures the chart fills the container precisely
      />
      {/* Center icon overlay */}
      <div
        style={{
          position: "absolute",
          fontSize: "24px",
          color: "#fff",
        }}
      >
        !
      </div>
    </div>
  );
};

export default DonutChartWithIcon;
