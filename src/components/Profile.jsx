import React,{useState,useEffect} from "react";
import styled from "styled-components";
import image from "../assets/greenhouse-profile.jpeg";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { cardStyles } from "./ReusableStyles";
export default function Profile({alarmNotSeen}) {

  const [count, setCount] = useState({});

  const getCount = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json();
        setCount(data);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() =>{
    getCount("http://127.0.0.1:8000/api/CountSensorDevice/");
}, []);
  
  return (
    <Section>
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="title">
        <h2>Greenhouse</h2>
        <h5>
          <HiOutlineLocationMarker /> Zanjan, Iran
        </h5>
      </div>
      <div className="info">
        <div className="container">
          <h5>Sensors</h5>
          <h3>{count.sensor_count}</h3>
        </div>
        <div className="container">
          <h5>Switches</h5>
          <h3>{count.device_count}</h3>
        </div>
        <div className="container">
          <h5>Alarms</h5>
          <h3>{alarmNotSeen.length}</h3>
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .image {
    max-height: 10rem;
    overflow: hidden;
    border-radius: 20rem;
    img {
      height: 10rem;
      width: 10rem;
      object-fit: cover;
      border-radius: 20rem;
      transition: 0.5s ease-in-out;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .title {
    text-align: center;
    h2,
    h5 {
      color: #697A21;
      letter-spacing: 0.1rem;
    }
    h5 {
      letter-spacing: 0.2rem;
    }
  }
  .info {
    display: flex;
    gap: 1rem;
    .container {
      text-align: center;
    }
  }
`;
