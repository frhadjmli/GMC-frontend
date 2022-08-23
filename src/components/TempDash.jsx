import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, LineElement, PointElement, 
CategoryScale, LinearScale, Title, Tooltip} from "chart.js";
import { Line } from "react-chartjs-2";
import { cardStyles } from "./ReusableStyles";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

export default function TempDash() {

  const [temperature, setTemperature] = useState([]);
  
  async function fetchTempData(){
    const url = "http://127.0.0.1:8000/api/SensorValueInfo/1/";
    const response = await fetch(url);
    const datapoints = await response.json();
    setTemperature(datapoints);
    console.log(temperature);
  };

  const connectToStream = () => {
    try {

      const stream = new EventSource("http://127.0.0.1:8000/events/");
      stream.addEventListener('temp_update', (event) => {

        const eventData = JSON.parse(event.data);
        setTemperature(temperature => [...temperature, eventData]); 
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchTempData();
    connectToStream();
}, []);

  const data = {
    labels: temperature.slice(-6).map(x => x.id),  
    datasets:[
      {
        label: "Temperature Data",
        data: temperature.slice(-6).map(x => x.value),
        fill: true,
        borderColor: "#697A21"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins:{
      title: {
        display: true,
        text: "Temperature Data"
      }
    }
  };

  let meanTemp = temperature.reduce((total, next) => parseInt(total) + parseInt(next.value), 0) / temperature.length;
  meanTemp = String(meanTemp.toFixed(1));

  return (
    <Section>
      <div className="top">
        <div className="info">
          <h5>Today Mean Temperature</h5>
          <h1>{meanTemp}c</h1>
          {/* <div className="growth">
            <span>+2.45%</span>
          </div> */}
        </div>
      </div>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #d7e41e1d;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #697A21;
          span {
            color: black;
          }
        }
        span {
          color: #697A21;
        }
      }
    }
  }
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: #697A21 !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
