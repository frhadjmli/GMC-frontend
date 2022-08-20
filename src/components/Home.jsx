import React from "react";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
export default function Home({alarmNotSeen,seenAlarm}) {
  return (
    <Div>
        <Sidebar alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>
        <Dashboard alarmNotSeen={alarmNotSeen}/>
    </Div> 
  );
}
const Div = styled.div`
  position: relative;
`;
