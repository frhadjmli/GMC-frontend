import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import { cardStyles } from "../ReusableStyles";
import CustomDataTable from '../CustomDataTable'
import Sidebar from "../Sidebar";

const Alarm = ({alarmNotSeen,seenAlarm,tempAlarmNotSeen}) => {

    const [showLog,setShowLog] = useState(false)

    const url = "http://127.0.0.1:8000/api/AlarmMessage/";
    const columns = [
      {
        name: "id",
        selector: row => row.id,
        sortable: true
      },
      {
        name: "alarm_message",
        selector: row => row.body_text,
        sortable: true
      },
      {
        name: "recorded_time",
        selector: row => row.recorded_time,
        sortable: true
      },
      {
        name: "date_time",
        selector: row => row.date_time,
        sortable: true
      },
      {
        name: "sensor_id",
        selector: row => row.sensor_id,
        sortable: true,
      },
    ];
    const search_column_field = 'sensor_id';
    const title_table = 'Alarm Log'    

    const handleClick = () => {
        setShowLog(curVal => !curVal)
    }

    const showLastAlarm = (alarmNotSeenLength , tempAlarmNotSeenLength) => {

      if(alarmNotSeenLength && tempAlarmNotSeenLength)
        return <h2>last alarm {alarmNotSeenLength + tempAlarmNotSeenLength}</h2>
      else if (alarmNotSeenLength)
        return <h2>last alarm {alarmNotSeenLength}</h2>
      else if (tempAlarmNotSeenLength)
        return <h2>last alarm {tempAlarmNotSeenLength}</h2>

      else return <h3>you can see log - click on show log</h3>
    }

  return (
    <Div>
        <Sidebar alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>
        <ShowLogBtn onClick={handleClick} >show log</ShowLogBtn>

        {!showLog && 
            <Section>
              <div className="grid">
                {showLastAlarm(alarmNotSeen.length,tempAlarmNotSeen.length)}        
                <div className="row__one">
                    
                    {alarmNotSeen.map(x =>
                        <div className="alarm_content">
                          id:{x.id}<br></br>
                          message:{x.body_text}<br></br>
                          recorded_time:{x.recorded_time}<br></br>
                          date_time:{x.date_time}
                        </div> 
                    )}         
                    
                    {tempAlarmNotSeen.map(x=>
                      <div className="alarm_content">
                        id:{x.id}<br></br>
                          message:{x.body_text}<br></br>
                          recorded_time:{x.recorded_time}<br></br>
                          date_time:{x.date_time}
                      </div>
                    )}
                </div>
              </div>
            </Section>
          }



        {showLog &&
        <CustomDataTable 
            url={url}
            columns={columns}
            search_column_field={search_column_field}
            title_table={title_table}
        />}
    </Div> 
  )
}

export default Alarm

const Div = styled.div`
  position: relative;
`;

const ShowLogBtn = styled.button`

  background-color: #676666;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  display: block;
  font-size: 14px;
  margin: 0;
  margin-left: 19vw;
  outline: 0;
  padding: 6px 14px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  transition-duration: 0.4s;

&:hover {
  background-color: #697a21;
  text-decoration: none;
  color: black;
  
}

@media screen and (min-width: 260px) and (max-width: 1080px) {
    margin-left: 1vw;
}
`;

const Section = styled.section`
margin-left: 18vw;
padding: 1rem;
height: 100%;
h2,h3,h4{color: #fff}
.grid {
  
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 0rem;
  .row__one {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }
  
  .alarm_content {
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

    }
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