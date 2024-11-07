import React, { useState } from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

ChartJs.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const { incomes, expenses } = useGlobalContext();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Filter data based on selected month and year
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

  const totalIncome = filteredIncomes.reduce((acc, inc) => acc + inc.amount, 0);
  const totalExpense = filteredExpenses.reduce(
    (acc, exp) => acc + exp.amount,
    0
  );

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#0DB71B", "#DB0303"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <PieChartStyled>
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
          {[2022, 2023, 2024].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <Pie data={data} />
    </PieChartStyled>
  );
}

const PieChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  justify-content: center;
  height: 95%;
  width: 50%;
  margin-bottom: 10vh;
  margin-left: 39vh;
  margin-top: 5vh;
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

export default PieChart;
