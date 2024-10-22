import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import React, { useState, useMemo } from "react";
// import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import ViewTransaction from "./Components/ViewTransaction/ViewTransaction";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Auth/Register";
import Main from "./Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Main />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
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

export default App;
