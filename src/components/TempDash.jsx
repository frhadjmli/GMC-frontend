import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, LineElement, PointElement, 
CategoryScale, LinearScale, Title, Tooltip} from "chart.js";
import { Line } from "react-chartjs-2";
import { cardStyles } from "./ReusableStyles";
import { useState, useEffect } from "react";
// const data = [
//   { data: 4500 },
//   {
//     data: 5000,
//   },
//   {
//     data: 4700,
//   },
//   {
//     data: 4400,
//   },
//   {
//     data: 4800,
//   },
//   {
//     data: 5300,
//   },
//   {
//     data: 5800,
//   },
//   {
//     data: 6000,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 6580,
//   },
//   {
//     data: 6780,
//   },
//   {
//     data: 6680,
//   },
//   {
//     data: 6500,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 5900,
//   },
//   {
//     data: 5700,
//   },
//   {
//     data: 5500,
//   },
//   {
//     data: 5300,
//   },
//   {
//     data: 5100,
//   },
//   {
//     data: 5090,
//   },
//   {
//     data: 5300,
//   },
//   {
//     data: 5800,
//   },
//   {
//     data: 6000,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 6780,
//   },
//   {
//     data: 6500,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 6500,
//   },
//   {
//     data: 6700,
//   },
//   {
//     data: 7000,
//   },
//   {
//     data: 7300,
//   },
//   {
//     data: 7500,
//   },
//   {
//     data: 7700,
//   },
//   {
//     data: 8090,
//   },
//   {
//     data: 8190,
//   },
//   {
//     data: 7990,
//   },

//   {
//     data: 7700,
//   },
//   {
//     data: 7500,
//   },
//   {
//     data: 7300,
//   },
//   {
//     data: 7000,
//   },
//   {
//     data: 6700,
//   },
//   {
//     data: 6500,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 6500,
//   },
//   {
//     data: 6780,
//   },
//   {
//     data: 6300,
//   },
//   {
//     data: 6000,
//   },
//   {
//     data: 5800,
//   },

//   {
//     data: 5490,
//   },
//   {
//     data: 6000,
//   },
//   {
//     data: 8000,
//   },
// ];

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
    const url = "http://127.0.0.1:8000/tempSensor/";
    const response = await fetch(url);
    const datapoints = await response.json();
    setTemperature(datapoints);
     console.log(temperature);
  };

  useEffect(() =>{
    fetchTempData();
}, []);

  const data = {
    labels: temperature.slice(-6).map(x => x.id),  
    datasets:[
      {
        label: "Temperature Data",
        data: temperature.slice(-6).map(x => x.temp_value),
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

  let meanTemp = temperature.reduce((r, c) => r + c.temp_value, 0) / temperature.length;
  meanTemp = (meanTemp.toFixed(1)).toString();

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
