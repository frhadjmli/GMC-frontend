import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./components/Home";
import Login from "./components/pages/login";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}
