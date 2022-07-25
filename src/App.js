import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import { Login } from "./components/pages/login";
import Temperature from "./components/pages/Temperature";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/temperature" element={<Temperature />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}
