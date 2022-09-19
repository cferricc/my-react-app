/**
 * 
 * 
 *  TUTORIAL https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications#introduction
 * 
 * 
 */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import TFC from '../TFC/TFC';
import Category from '../TFC/Category/Category';
import useToken from './UseToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/tfc" element={<TFC />}/>
          <Route path="/tfc/:tfcName" element={<TFC />}/>
          <Route path='/tfc/:tfcName/:categoryName' element={<Category />}/>

          <Route
            path="*"
            element={
                <p>There's nothing here!</p>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;