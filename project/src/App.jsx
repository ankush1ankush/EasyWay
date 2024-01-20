import React, { useEffect, useState } from "react";
import Header from  "./Header/Header"
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Register from "./Register/Register";
//import UploadImage from "./UploadImage/UploadImage";
import UploadFile from "./UploadFile/UploardFile"
import "./App.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./Login/login";

function App() {

  
  const [user, setUser] = useState(null);
  const location = useLocation()
  
  const getUser = async () => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
    console.log("HELLO -> fetching")

    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          // 'Content-Type' header is not necessary for a GET request
        },
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json(); 
      //console.log(data.user);
      setUser(data.user)
     // console.log(user)
    } catch (error) {
      console.error('Fetch error:', error);
    }
	};

  useEffect(()=>{
  getUser();
  },[location]);

  return (
    <>
    <div className="App">
      
      <Header  User={user} />    
      <Routes>
        
          <Route path="/"  element={user?<Home User={user}/>:<Navigate to="/login"/>}/>
          <Route path="/login"  element={user?<Navigate to="/"/>:<Login UpdateUser={setUser}/>}/>
          <Route path="/register"  element={user?<Navigate to='/'/>:<Register UpdateUser={setUser}/>}/>
          <Route path="/uploadFile"  element={user?<UploadFile client_id={user._id} files={user?.Document} UpdateUser={setUser} getUser={getUser} />:<Navigate to='/'/>}/>
          
      </Routes>
      
    </div>
      <Footer/>
      </>
  );
}

export default App;
