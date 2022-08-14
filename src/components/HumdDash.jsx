import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart as ChartJS, LineElement, PointElement, 
CategoryScale, LinearScale, Title, Tooltip} from "chart.js";
import { Line } from "react-chartjs-2";
import { cardStyles } from "./ReusableStyles";
export default function HumdDash() {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
  );

  const [humidity, setHumidity] = useState([]);

  const fetchHumdData = async () => {
    try {
      const url = "http://127.0.0.1:8000/HumdSensor/";
      const response = await fetch(url);
      const datapoints = await response.json();
      setHumidity(datapoints);
      console.log(humidity);
      
    } catch (error) {
      console.log(error);
    }
  };

  const connectToStream = () => {
    try {

      const stream = new EventSource("http://127.0.0.1:8000/events/");
      stream.addEventListener('humd_update', (event) => {

        const eventData = JSON.parse(event.data);
        setHumidity(humidity => [...humidity, eventData]); 
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchHumdData();
    connectToStream();
}, []);

const data = {
  labels: humidity.slice(-10).map(x => x.id),  
  datasets:[
    {
      label: "Humidity Data",
      data: humidity.slice(-10).map(x => x.value),
      fill: true,
      borderColor: "#a78842"
    }
  ]
};

const options = {
  responsive: true,
  plugins:{
    title: {
      display: true,
      text: "Humidity Data"
    }
  }
};

  return (
    <Section>
      <div className="title">
        <h2>Diagram sits here</h2>
      </div>
      <div className="faqs">
        <Line data={data} options={options} />
      </div>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  .title {
    h2 {
      color: #697A21;
      letter-spacing: 0rem;
    }
  }
  .faqs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .faq {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .info {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        font-size: 1.4rem;
      }
      &:nth-of-type(2) {
        border-top: 0.01rem solid #6c6e6e;
        border-bottom: 0.01rem solid #6c6e6e;
        padding: 0.8rem 0;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    svg {
      font-size: 2rem !important;
    }
  }
`;
