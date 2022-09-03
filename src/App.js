import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import { Login } from "./components/pages/login";
import Temperature from "./components/pages/Temperature";
import Humidity from './components/pages/Humidity'
import Lux from './components/pages/Lux'
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import Alarm from './components/pages/Alarm'
import AlarmRange from './components/pages/AlarmRange'

const ROLES = {
  'NormalUser': 'N',
  'Admin': 'A'
}

export default function App() {

  const [alarmNotSeen,setAlarmNotSeen] = useState([])
  const [tempAlarmNotSeen,setTempAlarmNotSeen] = useState([])

  const getAlarmNotSeen = async (url) => {
    try{
        const response = await fetch(url,{
          method:'GET',
          headers:{
              'Authorization': `token ${JSON.parse(localStorage.getItem('authTokens')).token}`
          }
      });
        const data = await response.json();
        setAlarmNotSeen(data);
    } catch (error) {
        console.log(error);
    }
  };

  const seenAlarm = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/AlarmMessage/update/",{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${JSON.parse(localStorage.getItem('authTokens')).token}`
        },
        body:{}
    })
    setTempAlarmNotSeen(alarmNotSeen)
    setAlarmNotSeen([])
  }

  useEffect(() =>{
    getAlarmNotSeen("http://127.0.0.1:8000/api/AlarmMessage/notSeen/");
    connectToStream();
   }, []);
   
   const connectToStream = () => {
     try {
 
       const stream = new EventSource("http://127.0.0.1:8000/events/");
       stream.addEventListener('temp_alarm', (event) => {
         
         const eventData = JSON.parse(event.data);
         setAlarmNotSeen(alarmNotSeen => [...alarmNotSeen, eventData]); 
       });
 
       stream.addEventListener('humd_alarm', (event) => {
 
        const eventData = JSON.parse(event.data);
        setAlarmNotSeen(alarmNotSeen => [...alarmNotSeen, eventData]); 
       });
 
       stream.addEventListener('lux_alarm', (event) => {
 
        const eventData = JSON.parse(event.data);
        setAlarmNotSeen(alarmNotSeen => [...alarmNotSeen, eventData]); 
       });
       
     } catch (error) {
       console.log(error);
     }
   };


  return (
    <Router>
      <Routes>

        <Route element={<AuthProvider> <PrivateRoutes allowedRoles={[ROLES.NormalUser,ROLES.Admin]}/> </AuthProvider>}>
          <Route path="/temperature" element={<Temperature alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>}/>
          <Route path="/humidity" element={<Humidity alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>}/>
          <Route path="/lux" element={<Lux alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>}/>
          <Route path="/alarm" element={<Alarm alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm} tempAlarmNotSeen={tempAlarmNotSeen}/>}/>
          <Route path="/" element={<Home alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>}/>
        </Route>
        <Route element={<AuthProvider> <PrivateRoutes allowedRoles={[ROLES.Admin]}/> </AuthProvider>}>
          <Route path="/alarmRange" element={<AlarmRange alarmNotSeen={alarmNotSeen} seenAlarm={seenAlarm}/>}/>
        </Route>

        <Route path="/login" element={<AuthProvider> <Login /> </AuthProvider>}/>
        <Route path="/unauthorizad" element={<p style={{color:'#fff'}}>unauthorizad!</p>}/>
        <Route path="*" element={<p style={{color:'#fff'}}>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}
