import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Salary</span>Max
            </h2>
            <div className="salary-item">
              <p>
                $ {incomes.length > 0 ? Math.min(...incomes.map((item) => item.amount)) : 0}
              </p>
              <p>
                $ {incomes.length > 0 ? Math.max(...incomes.map((item) => item.amount)) : 0}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                $ {expenses.length > 0 ? Math.min(...expenses.map((item) => item.amount)) : 0}
              </p>
              <p>
                $ {expenses.length > 0 ? Math.max(...expenses.map((item) => item.amount)) : 0}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    transition: all 0.3s ease;
    min-height: 100vh; /* Ensure it stretches to full height */

    .chart-con {
      grid-column: 1 / 4;
      height: 400px;

      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 0.5rem;

        .income,
        .expense {
          grid-column: span 2;
        }

        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 0.5rem;
          word-wrap: break-word;

          p {
            font-size: 3rem;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: -1rem;
          align-items: center;

          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 3rem;
          }
        }
      }
    }

    .history-con,
    .salary-title,
    .salary-item {
      /* Default order for large screens */
      order: 0;
    }

    .history-con {
      grid-column: 4 / -1;
      margin-top: 2rem; /* Add margin to avoid overlap */

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .salary-title {
        font-size: 1.2rem;

        span {
          font-size: 1.6rem;
        }
      }

      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          font-weight: 600;
          font-size: 1.3rem;
          word-wrap: break-word;
        }
      }
    }
  }

  // Responsive adjustments
  @media (max-width: 1024px) {
    .stats-con {
      grid-template-columns: 1fr;

      .chart-con {
        grid-column: 1 / -1;
      }

      .history-con {
        grid-column: 1 / -1;
        margin-top: 2rem;
      }
    }
  }

  @media (max-width: 768px) {
    .amount-con {
      grid-template-columns: 1fr;

      .income,
      .expense,
      .balance {
        p {
          font-size: 2.5rem;
        }
      }
    }

    .salary-title,
    .salary-item p {
      font-size: 1rem;
    }

    .amount-con .income,
    .amount-con .expense,
    .amount-con .balance {
      grid-column: 1 / -1;
      text-align: center;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    gap: 1rem;

    .chart-con {
      height: 300px;
    }

    .amount-con {
      .income,
      .expense,
      .balance {
        p {
          font-size: 2rem;
        }
      }
    }

    .salary-item {
      padding: 0.75rem;

      p {
        font-size: 1.1rem;
      }
    }

    .amount-con .income,
    .amount-con .expense,
    .amount-con .balance {
      font-size: 1.5rem; /* Reduce font size further for extra-small screens */
      padding: 0.5rem; /* Add padding to prevent overlap */
      text-align: center;
      margin-bottom: 1rem;
    }

    /* Move the history and salary sections below */
    .history-con,
    .salary-title,
    .salary-item {
      order: 1; /* Move them to the bottom */
      transition: all 0.3s ease; /* Add smooth transition */
      margin-top: 2rem; /* Ensure there's space between sections */
    }
  }
`;

export default Dashboard;




