import React from "react";
import PieChart from "../Components/Chart/PieChart";
import BarChart from "../Components/Chart/BarChart";
import styled from "styled-components";

const Visual = () => {
  return (
    <VisualStyled>
      <PieChart />
      <BarChart />
    </VisualStyled>
  );
};

const VisualStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;

  .chart-container {
    flex: 1;
    min-width: 400px; /* Minimum width for each chart */
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .chart-container {
      width: 100%; /* Full width on smaller screens */
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;
    .chart-container {
      width: 100%; /* Full width on extra-small screens */
      margin-bottom: 1rem;
    }
  }
`;

export default Visual;
