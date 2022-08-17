import React,{useState} from 'react'
import styled from "styled-components";
import CustomDataTable from '../CustomDataTable'
import Sidebar from "../Sidebar";

const Alarm = () => {

    const [showLog,setShowLog] = useState(false)

    const url = "http://127.0.0.1:8000/AlarmMessage/";
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
  return (
    <Div>
        <Sidebar />
        <ShowLogBtn onClick={handleClick} >show log</ShowLogBtn>
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
