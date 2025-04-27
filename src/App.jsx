import { useState } from 'react';
import { Routes, Route } from "react-router";
import Home from './Pages/Home';
import './App.css';
import Search from './Pages/Search';
import OnlineClass from './Components/OnlineClass/OnlineClass';

function App() {

  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='search' element={<Search/>}/>
        <Route path='online-class' element={<OnlineClass/>}/>
      </Routes>
    </div>
  )
}

export default App
