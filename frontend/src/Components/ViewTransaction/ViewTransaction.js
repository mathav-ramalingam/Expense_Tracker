import React from "react";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";
import ViewHistory from "../../History/ViewHistory";

function ViewTransaction() {
  return (
    <ViewTransactionStyled>
      <InnerLayout>
        <div className="history-con">
            <ViewHistory />
        </div>
      </InnerLayout>
    </ViewTransactionStyled>
  );
}

const ViewTransactionStyled = styled.div`
  .history-con {
    grid-column: 4 / -1;
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
  }
`;

export default ViewTransaction;
