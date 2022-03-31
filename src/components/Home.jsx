import React from "react";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
export default function Home() {
  return (
    <Div>
        <Sidebar />
        <Dashboard />
    </Div> 
  );
}
const Div = styled.div`
  position: relative;
`;
