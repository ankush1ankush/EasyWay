import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Note.css";






function Note(props) {


  const  deleteNote= async () => {
    const url = `${process.env.REACT_APP_API_URL}/submit/deleteNote`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id:props.client_id,
          Note_id: props.id
          
        })
      });
      
     
     
      
      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result= await response.json();
      console.log(result);
      props.onDelete(result.notes);
    } catch (error) {
      console.error('Fetch error:', error);
    }
	};

  function handleClick() {
    //console.log("click");
     deleteNote();
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
