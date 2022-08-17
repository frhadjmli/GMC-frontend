import React from "react";
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

export default function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthProvider> <PrivateRoutes /> </AuthProvider>}>
          <Route path="/temperature" element={<Temperature />}/>
          <Route path="/humidity" element={<Humidity />}/>
          <Route path="/lux" element={<Lux />}/>
          <Route path="/alarm" element={<Alarm />}/>
          <Route path="/" element={<Home />}/>
        </Route>

        <Route path="/login" element={<AuthProvider> <Login /> </AuthProvider>}/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}
