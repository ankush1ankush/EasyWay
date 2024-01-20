import React, { useState } from "react";
import "./Register.css"
import 'bootstrap/dist/css/bootstrap.min.css';
//import {  useNavigate } from 'react-router-dom';


function Register(props){
    //const navigate = useNavigate();
    const [user,setUser]=useState({
        userName:"",
        password:"",
        email:"",
    
     })
 const RegisterUser= async (event)=>{
    event.preventDefault()
     //console.log(user);
    const url  = `${process.env.REACT_APP_API_URL}/submit/register`;

    try{
         
        const response = await fetch(url,{
           method:"POST",
           credentials:"include",
           headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            username:user.userName,
            email:user.email,
            password:user.password,
           })
        })

       /* if (!response.ok) {
            const result= await response.json();
            console.log(result);
            
              alert(result.message);
            
          
        }
        else{    
         const result= await response.json();
         console.log(result);
         
        alert(result.message);

           setUser({
            userName:"",
            password:"",
            email:"",
        
         })
          
         navigate('/')

        
    }*/
         
        
    if (!response.ok) {
        const result= await response.json();
        console.log(result);
        
        alert(result.message);
        
      
    }
    else{
        const result= await response.json();
        console.log(result)
        if(result.myclient)
        {
            props.UpdateUser(result.myclient);
        } 
    }
          

    
    }
    catch (error) {
        console.error('Fetch error:', error);
      }


    
 }

 

 
 
 function handleChange(event)
 {   
     
     const {name,value}=event.target;
     
     setUser((preValue)=>{
        return {
            ...preValue,
            [name]:value
        }
     })
     
 }

 return (
        <div class="container">
        <div class="screen">
            <div class="screen__content">
                <form onSubmit={RegisterUser} class="login">
                    <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" value={user.email} onChange={handleChange} name="email" className="login__input" placeholder="Email"/>
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" value={user.userName} onChange={handleChange}  name="userName" className="login__input" placeholder="User name"/>
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-lock"></i>
                        <input type="password"value={user.password} onChange={handleChange} name="password" className="login__input" placeholder="Password"/>
                    </div>
                    <button type="submit"  className="button login__submit">
                        <span className="button__text">Register Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>				
                </form>
              
                
            </div>
            <div class="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>		
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>		
        </div>
    </div>
    )
}

export default Register;



