import React, { useState } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import { useGlobalContext } from "../../context/globalContext";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome

function DownloadReport() {
  const { incomes, expenses } = useGlobalContext();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const filterData = (data) => {
    return data.filter((item) => {
      const date = new Date(item.date);
      return (
        (!month || date.getMonth() + 1 === parseInt(month)) &&
        (!year || date.getFullYear() === parseInt(year))
      );
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const downloadPDF = () => {
    const filteredIncomes = filterData(incomes);
    const filteredExpenses = filterData(expenses);
    const doc = new jsPDF();

    // Document title and filters
    doc.setFontSize(16);
    doc.text("User Financial Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Month: ${month || "All"} | Year: ${year || "All"}`, 20, 30);

    // Adding income details
    doc.setFontSize(14);
    doc.text("Income Details:", 20, 50);
    doc.setFontSize(12);
    let yOffset = 60;
    filteredIncomes.forEach((income, index) => {
      doc.text(
        `${index + 1}. ${income.description} - $${
          income.amount
        } on ${formatDate(income.date)}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    // Adding expense details
    yOffset += 10;
    doc.setFontSize(14);
    doc.text("Expense Details:", 20, yOffset);
    doc.setFontSize(12);
    yOffset += 10;
    filteredExpenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. ${expense.description} - $${
          expense.amount
        } on ${formatDate(expense.date)}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    doc.save("financial_report.pdf");
  };

  return (
    <DownloadReportStyled>
      <div>
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
          <button className="b" onClick={downloadPDF}>
            <i className="fas fa-download" style={{ fontSize: "13px" }}></i>{" "}
            {/* Icon with increased size */}
          </button>
        </div>
      </div>
    </DownloadReportStyled>
  );
}

const DownloadReportStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  height: 10%;
  width: 100%;
  spacing: 40px;

  .filters {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    select {
      padding: 0.5rem;
      border-radius: 10px;
      border: 1px solid #ddd;
    }
    button {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-left: 10px;
      i {
        margin-right: 5px;
      }
    }
  }
`;

export default DownloadReport;
