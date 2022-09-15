import './App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';

function App() {
  const [{user},dispatch] = useStateValue();
  
  return (
    <div className="App">
      {!user?(
        <Login />
      ):(
        <div className='app__body'>
          <Router>
          <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
