import React,{useState,useEffect} from'react'
import styled from "styled-components";
import { cardStyles } from "../ReusableStyles";
import CounterRange from '../CounterRange'
import Sidebar from '../Sidebar'
import useAuth from '../../hooks/useAuth'

const AlarmRange = ({alarmNotSeen,seenAlarm}) => {
    const [sensorTypeRange, setSensorTypeRange] = useState([]);

    const {authTokens} = useAuth();

    const getSensorTypeRange = async (url) => {
      try{
          const response = await fetch(url,{
            method:'GET',
            headers:{
                'Authorization': `token ${authTokens.token}`
            }
          });
          const data = await response.json();
          setSensorTypeRange(data);
      } catch (error) {
          console.log(error);
      }
    };
  
    useEffect(() =>{
        getSensorTypeRange("http://127.0.0.1:8000/api/SensorTypeRange/");

  }, []);

    return (
        <Div>
            <Sidebar alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm} />
            <Section>
                <div className='grid'>
                    <h2>Range value</h2>
                    <div className='row'>
                        {sensorTypeRange.map(x=> 
                        <div key={x.id} className='content'>
                            <h3>{x.title}</h3>
                            <CounterRange min_range={x.min_range} max_range={x.max_range} id={x.id}/>
                            <br></br>
                            <br></br>
                        </div>
                        )}
                    </div>
                </div>
            </Section>
        </Div>
    )
}

export default AlarmRange

const Div = styled.div`
  position: relative;
`;

const Section = styled.section`
margin-left: 18vw;
padding: 1rem;
height: 100%;
color: #fff;
.grid {
  
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 0rem;
    .row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50%;
      gap: 1rem;
    }
    
    .content {
      ${cardStyles};
      gap: 1rem;


  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
      margin-left: -19vw;
      .row__one {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 50%;
        gap: 0.25rem;
  
        } 
  }
  @media screen and (min-width: 260px) and (max-width: 668px) {
    .row__one {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      height: 50%;
      gap: 0.25rem;
  
      } 
  }
`;
