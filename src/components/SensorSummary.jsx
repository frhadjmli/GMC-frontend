import React from "react";
import { useState, useEffect} from "react";
import styled from "styled-components";
import avatarImage from "../assets/temperature.png";
import humdIcon from "../assets/humidity.png";
import sunIcon from "../assets/sun.png";
import { cardStyles } from "./ReusableStyles";
import useAuth from '../hooks/useAuth';

export default function SensorSummary() {

  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [lux, setLux] = useState([]);
  const {authTokens} = useAuth();

  const fetchSensorData = async (url) => {
    let urlEndpoint = url.slice(url.indexOf('/',7)+1, url.length-1);
    if (urlEndpoint[urlEndpoint.length-1] === '1'){
      try {
        const response = await fetch(url,{
          method:'GET',
          headers:{
              'Authorization': `token ${authTokens.token}`
          }
      });
        const datapoints = await response.json();
        setTemperature(datapoints);
        console.log(temperature);
      } catch (error) {
        console.log(error);
      }
    }
    else if(urlEndpoint[urlEndpoint.length-1] === '2'){
      try {
        const response = await fetch(url,{
          method:'GET',
          headers:{
              'Authorization': `token ${authTokens.token}`
          }
      });
        const datapoints = await response.json();
        setHumidity(datapoints);
        console.log(humidity);
      } catch (error) {
        console.log(error);
      }
    }
    else if(urlEndpoint[urlEndpoint.length-1] === '3'){
      try {
        const response = await fetch(url,{
          method:'GET',
          headers:{
              'Authorization': `token ${authTokens.token}`
          }
      });
        const datapoints = await response.json();
        setLux(datapoints);
        console.log(lux);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const connectToStream = () => {
    try {

      const stream = new EventSource("http://127.0.0.1:8000/events/");
      stream.addEventListener('temp_update', (event) => {

        const eventData = JSON.parse(event.data);
        setTemperature(temperature => [...temperature, eventData]); 
      });

      stream.addEventListener('humd_update', (event) => {

        const eventData = JSON.parse(event.data);
        setHumidity(humidity => [...humidity, eventData]); 
      });

      stream.addEventListener('lux_update', (event) => {

        const eventData = JSON.parse(event.data);
        setLux(lux => [...lux, eventData]); 
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    fetchSensorData("http://127.0.0.1:8000/api/SensorValueInfo/1/");
    fetchSensorData("http://127.0.0.1:8000/api/SensorValueInfo/2/");
    fetchSensorData("http://127.0.0.1:8000/api/SensorValueInfo/3/");
    connectToStream();
}, []);

  const transactions = [
    {
      image: avatarImage,
      name: "Temp Sensor",
      time: `Today, ${temperature.slice(-1).map(x => x.recorded_time)}`,
      amount: parseInt(temperature.slice(-1).map(x => x.value))
      .toString()+String.fromCodePoint(8451),
    },
    {
      image: humdIcon,
      name: "Humd Sensor",
      time: `Today, ${humidity.slice(-1).map(x => x.recorded_time)}`,
      amount: parseInt(humidity.slice(-1).map(x => x.value)).toString()+' %'
    },
    {
      image: sunIcon,
      name: "Lux Sensor",
      time: `Today, ${lux.slice(-1).map(x => x.recorded_time)}`,
      amount: parseInt(lux.slice(-1).map(x => x.value)).toString()+' lx',
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Sensors</h2>
      </div>
      <div className="transactions">
        {transactions.map((transaction) => {
          return (
            <div className="transaction">
              <div className="transaction__title">
                <div className="transaction__title__image">
                  <img src={transaction.image} alt="" />
                </div>
                <div className="transaction__title__details">
                  <h3>{transaction.name}</h3>
                  <h5>{transaction.time}</h5>
                </div>
              </div>
              <div className="transaction__amount">
                <span>{transaction.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    h2 {
      color: #697A21;
      letter-spacing: 0rem;
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: #cede87;
        padding: 0.2rem 0.5rem;
        width: 5rem;
        border-radius: 1rem;
        text-align: center;
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
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #697A21;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
