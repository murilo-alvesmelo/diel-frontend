import React from "react";
import { 
  BrowserRouter as Router, 
  Route,
  Routes } from "react-router-dom"
import Hoje from "./components/Hoje";
import Home from "./components/Home";
import Mes from "./components/Mes";
import Semana from "./components/Semana";

export default class App extends React.Component{
  render(){
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/hoje" element={<Hoje/>}/>
          <Route path="/semana" element={<Semana/>}/>
          <Route path="/mes" element={<Mes/>}/>
        </Routes>
      </Router>
    );
  }
}
