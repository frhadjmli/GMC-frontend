import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import { Login } from "./components/pages/login";
import Temperature from "./components/pages/Temperature";
import Humidity from './components/pages/Humidity'
import Lux from './components/pages/Lux'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/temperature" element={<Temperature />}/>
        <Route path="/humidity" element={<Humidity />}/>
        <Route path="/lux" element={<Lux />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}
