import { Routes, Route } from "react-router-dom";

import Headers from "./components/Headers";
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

import './App.css'

//Routing from one route to another route

const App = () => (
  <div className="main-container">
    <Headers/>
    <div className="routes-container">
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </div>
  </div>
);

export default App;
