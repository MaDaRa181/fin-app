import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  PieController,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartJsData } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  PieController,
  LineController,
  BarController
);

export type ChartType = "bar" | "line" | "pie" | "doughnut";

interface ChartWrapperProps {
  type: ChartType;
  data: ChartJsData;
  options?: any;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const ChartJsWrapper: React.FC<ChartWrapperProps> = ({
  type,
  data,
  options,
  width,
  height,
  className,
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#222222",
          font: { size: 13 },
        },
      },
      title: {
        display: false,
        text: "Chart Title",
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales:
      type === "bar" || type === "line"
        ? {
            y: {
              beginAtZero: true,
              ticks: { color: "#888888", font: { size: 12 } },
              grid: { color: "#eeeeee" },
            },
            x: {
              ticks: { color: "#888888", font: { size: 12 } },
              grid: { display: false },
            },
          }
        : undefined,
  };

  const chartOptions = { ...defaultOptions, ...options };

  if (type === "pie" || type === "doughnut") {
    chartOptions.plugins.legend.position = "bottom";
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: width || "100%",
        height: height || "300px",
      }}
    >
      <Chart type={type} data={data} options={chartOptions} />
    </div>
  );
};

export default ChartJsWrapper;
