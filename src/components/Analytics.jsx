import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaWater } from "react-icons/fa";
import { GiComputerFan } from "react-icons/gi";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";


export default function Analytics() {

  const [fan, setFan] = useState([]);
  const [pump, setPump] = useState([]);

  const fetchFanData = async () => {
    try {
      const url = "http://127.0.0.1:8000/Ventilation/";
      const response = await fetch(url);
      const datapoints = await response.json();
      setFan(datapoints);
      console.log(fan);
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPumpData = async () => {
    try {
      const url = "http://127.0.0.1:8000/Irrigation/";
      const response = await fetch(url);
      const datapoints = await response.json();
      setPump(datapoints);
      console.log(pump);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchFanData();
    fetchPumpData();
}, []);

  const fan_status = fan.slice(-1).map(x => x.fan_status);
  const fan_id = fan.slice(-1).map(x => x.fan_id);
  const pump_status = pump.slice(-1).map(x => x.pump_status);
  const pump_id = pump.slice(-1).map(x => x.pump_id);


  return (
    <Section>
      <div className="analytic ">
        <div className="content">
          <h4>{pump_id}</h4>
          <h5>{pump_status ? 'ON':'OFF'}</h5>
        </div>
        <div className="logo">
          <FaWater />
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <GiComputerFan />
        </div>
        <div className="content">
          <h4>{fan_id}</h4>
          <h5>{fan_status ? 'ON':'OFF'}</h5>
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
          <BiGroup />
        </div>
        <div className="content">
          <h5>N/A</h5>
          <h2>N/A</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>N/A</h5>
          <h2>N/A</h2>
        </div>
        <div className="logo">
          <FiActivity />
        </div>
      </div>
    </Section>
    
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #697A21;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: black;
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
