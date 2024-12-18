import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import React, { useState, useMemo } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import ViewTransaction from "./Components/ViewTransaction/ViewTransaction";
import Visual from "./Visual/Visual";
import DownloadReport from "./Components/DownloadReport/DownloadReport";

function Main() {
  const [active, setActive] = React.useState(1);

  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransaction />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Visual />;
      case 6:
        return <DownloadReport />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 226, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Main;
