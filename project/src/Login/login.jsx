import React, { useState } from "react";

import "./login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
function Login( props){
       
    const [user,setUser]=useState({
        
        userName:"",
        password:"",
       
    
     })
    const googleAuth = () => {
        //console.log("click");
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/signup`,
			"_self"
		);

    
    
	};
    const login= async (event)=>{
        event.preventDefault()
        //console.log(user);
       const url  = `http://localhost:8080/auth/submit/login`;
   
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
           //console.log(result);
           
           alert(result.message);
           
         
       }
       else{
           const result= await response.json();
          // console.log(result)
           if(result.myclient)
           {
               props.UpdateUser(result.myclient);
           } 
           else{
           alert(result.message);
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
        setUser((preUser)=>{
             return{ ...preUser,[name]:value}
        })
    }
    
    return (
        <div class="container">
        <div class="screen">
            <div class="screen__content">
                <form class="login">
                    <div class="login__field">
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" onChange={handleChange} value={user.username} name="userName" className="login__input" placeholder="Usename"/>
                    </div>
                    <div class="login__field">
                        <i class="login__icon fas fa-lock"></i>
                        <input type="password" onChange={handleChange} value={user.password} name="password" className="login__input" placeholder="Password"/>
                    </div>
                    <button type="submit" onClick={login} className="button login__submit">
                        <span className="button__text">Log In Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>				
                </form>
                <div className="forgot-singup">
                
                <p  className="register"><Link to="/register"> Register</Link></p>
                <p className="or">or</p>
                <p className="SingUp">Sign Up with</p><GoogleIcon onClick={googleAuth} className="Icon"/>
                </div>
                
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

export default Login;



