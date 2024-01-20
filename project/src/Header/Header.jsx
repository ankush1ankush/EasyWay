import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Header.css";
import { Link } from "react-router-dom";


function Header(props) {
  const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};
  return (
    <header>
      <h1>
        <HighlightIcon />
        EasyWay
      </h1>
      
      {props.User?<button  className="logout" fontSize="large" onClick={logout}>Logout</button>:null}
      {
        props.User?
      <Dropdown className="dropDown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Upload
      </Dropdown.Toggle>
     
      <Dropdown.Menu>
        <Dropdown.Item ><Link to="/uploadFile">Upload File</Link></Dropdown.Item>
        <Dropdown.Item ><Link to="/">Upload Note</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>:null
     
     }
    </header>
  );
}

export default Header;
