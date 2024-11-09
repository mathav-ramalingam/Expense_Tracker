import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import { useGlobalContext } from "../../context/globalContext";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

function DownloadReport() {
  const { incomes, expenses } = useGlobalContext();
  const [startDate, setStartDate] = useState(null); // Set initial state to null
  const [endDate, setEndDate] = useState(null); // Set initial state to null
  const [showReport, setShowReport] = useState(false);

  // Reset filter values when the component is mounted
  useEffect(() => {
    setStartDate(null); // Reset to null when the component is rendered
    setEndDate(null); // Reset to null when the component is rendered
  }, []);

  const filterData = (data) => {
    return data.filter((item) => {
      const date = new Date(item.date);
      const isWithinDateRange = (!startDate || new Date(startDate) <= date) && (!endDate || date <= new Date(endDate));
      return isWithinDateRange;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const downloadPDF = () => {
    if (!startDate || !endDate) {
      toast.error("Please fill in both the start and end dates to generate the report.");
      return;
    }

    const filteredIncomes = filterData(incomes);
    const filteredExpenses = filterData(expenses);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("User Financial Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Date Range: ${startDate || "N/A"} to ${endDate || "N/A"}`, 20, 30);

    doc.setFontSize(14);
    doc.text("Income Details:", 20, 50);
    doc.setFontSize(12);
    let yOffset = 60;
    filteredIncomes.forEach((income, index) => {
      doc.text(
        `${index + 1}. ${income.description} - $${income.amount} on ${formatDate(income.date)}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    yOffset += 10;
    doc.setFontSize(14);
    doc.text("Expense Details:", 20, yOffset);
    doc.setFontSize(12);
    yOffset += 10;
    filteredExpenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. ${expense.description} - $${expense.amount} on ${formatDate(expense.date)}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    doc.save("financial_report.pdf");
  };

  const viewReport = () => {
    if (!startDate || !endDate) {
      toast.error("Please fill in both the start and end dates to view the report.");
      return;
    }
    setShowReport(true);
  };

  const filteredIncomes = filterData(incomes);
  const filteredExpenses = filterData(expenses);

  return (
    <DownloadReportStyled>
      <div className="filters">
        <input
          type="date"
          value={startDate || ""} // Default to empty string if null
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate || ""} // Default to empty string if null
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <div className="buttons">
          <button className="view-btn" onClick={viewReport}>
            <i className="fas fa-eye"></i> View Report
          </button>
          <button className="download-btn" onClick={downloadPDF}>
            <i className="fas fa-download"></i> Download
          </button>
        </div>
      </div>

      {showReport && (
        <ReportDetailsStyled>
          <div className="report-section">
            <h3>Income Details</h3>
            {filteredIncomes.length > 0 ? (
              filteredIncomes.map((income, index) => (
                <p key={index}>
                  {index + 1}. {income.description} - ${income.amount} on {formatDate(income.date)}
                </p>
              ))
            ) : (
              <p>No income records found for the selected date range.</p>
            )}
          </div>
          <div className="report-section">
            <h3>Expense Details</h3>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <p key={index}>
                  {index + 1}. {expense.description} - ${expense.amount} on {formatDate(expense.date)}
                </p>
              ))
            ) : (
              <p>No expense records found for the selected date range.</p>
            )}
          </div>
        </ReportDetailsStyled>
      )}
    </DownloadReportStyled>
  );
}

const DownloadReportStyled = styled.div`
  background: linear-gradient(145deg, #fce4ec, #f8bbd0);
  border-radius: 16px;
  padding: 2rem;
  width: 85%;
  height: auto;
  margin: auto;
  margin-top: 40px;
  box-shadow: 0px 4px 12px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  .filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    gap: 1.5rem;

    input[type="date"] {
      padding: 0.8rem;
      width: 100%;
      border-radius: 12px;
      border: 1px solid #ddd;
      box-shadow: inset 2px 2px 8px rgba(0, 0, 0, 0.05);
      font-size: 1rem;
      background-color: #f3e5f5;
      color: #333;
      transition: all 0.3s ease;

      &:focus {
        border-color: #ff4081;
        outline: none;
        background-color: #fff;
      }

      &::placeholder {
        color: #aaa;
      }
    }

    .buttons {
      display: flex;
      gap: 1rem;
      width: 100%;

      .view-btn, .download-btn {
        flex: 1;
        padding: 0.8rem;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;

        i {
          margin-right: 0.5rem;
        }
      }

      .view-btn {
        background: #ff80ab;
        color: white;

        &:hover {
          background: #ff4081;
        }
      }

      .download-btn {
        background: #007bff;
        color: white;

        &:hover {
          background: #0056b3;
        }
      }
    }
  }
`;

const ReportDetailsStyled = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  margin-top: 1rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 1;
  max-height: 1000px;

  .report-section {
    margin-bottom: 1rem;

    h3 {
      font-size: 1.2rem;
      color: #ff4081;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.5rem 0;
      font-size: 0.95rem;
      color: #333;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.8rem;

    .report-section h3 {
      font-size: 1rem;
    }

    .report-section p {
      font-size: 0.9rem;
    }
  }
`;

export default DownloadReport;
