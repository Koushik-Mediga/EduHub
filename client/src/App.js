import { useState } from "react";
import "./App.css";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/Error";


function App() {

  return (
   <div className="w-screen min-h-screen bg-richblack-900 font-inter flex flex-col">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/error" element={<Error/>}></Route>
    </Routes>
   </div>
  );
}

export default App;
