import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  // Combine all unique dates from incomes and expenses, then sort
  const allDates = [
    ...new Set([
      ...incomes.map((inc) => inc.date),
      ...expenses.map((exp) => exp.date),
    ]),
  ].sort((a, b) => new Date(a) - new Date(b));

  // Format all dates
  const formattedDates = allDates.map((date) => dateFormat(date));

  // Create income and expense data aligned with all dates
  const incomeData = allDates.map((date) => {
    const income = incomes.find((inc) => inc.date === date);
    return income ? income.amount : 0;
  });

  const expenseData = allDates.map((date) => {
    const expense = expenses.find((exp) => exp.date === date);
    return expense ? expense.amount : 0;
  });

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
        borderColor: "green",
        tension: 0.2,
        pointBackgroundColor: "green",
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "red",
        borderColor: "red",
        tension: 0.2,
        pointBackgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to scale with container
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const amount = context.raw;
            return `${label}: $${amount}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Line data={data} options={options} />
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  max-width: 800px; // Optional max width for large screens
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 0.25rem;
    border-radius: 10px;
  }

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

export default Chart;
