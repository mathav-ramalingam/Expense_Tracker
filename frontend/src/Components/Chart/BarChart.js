import React, { useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

ChartJs.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart() {
  const { incomes, expenses } = useGlobalContext();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Filter income and expense data based on selected month and year
  const filteredIncomes = incomes.filter((inc) => {
    const date = new Date(inc.date);
    return (
      (!month || date.getMonth() + 1 === parseInt(month)) &&
      (!year || date.getFullYear() === parseInt(year))
    );
  });

  const filteredExpenses = expenses.filter((exp) => {
    const date = new Date(exp.date);
    return (
      (!month || date.getMonth() + 1 === parseInt(month)) &&
      (!year || date.getFullYear() === parseInt(year))
    );
  });

  // Get the amounts for the chart
  const incomeAmounts = filteredIncomes.map((income) => income.amount);
  const expenseAmounts = filteredExpenses.map((expense) => expense.amount);

  // Prepare data for the Bar chart
  const data = {
    labels: filteredIncomes.map((inc, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: "Income",
        data: incomeAmounts,
        backgroundColor: "#0DB71B",
        borderColor: "#0DB71B",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseAmounts,
        backgroundColor: "#DB0303",
        borderColor: "#DB0303",
        borderWidth: 1,
      },
    ],
  };

  return (
    <BarChartStyled>
      <div className="filters">
        <select onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select onChange={(e) => setYear(e.target.value)} value={year}>
          <option value="">All Years</option>
          {[2020, 2021, 2022, 2023, 2024].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <Bar data={data} />
    </BarChartStyled>
  );
}

const BarChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 80%;
  width: 75%;
  margin-bottom: 5vh;
  margin-left: 20vh;
  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    select {
      padding: 0.5rem;
      border-radius: 10px;
      border: 1px solid #ddd;
    }
  }
`;

export default BarChart;
