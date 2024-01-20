import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./CreateArea.css";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  
 
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    
    ADDdata();
    setNote({
      title: "",
      content: ""
    });
    //console.log(props.User);
   
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }


  
  const ADDdata = async () => {
    const url = `${process.env.REACT_APP_API_URL}/submit/addNote`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          clientId: props.User._id
        })
      });
      
     
     
      
      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result= await response.json();
      console.log(result);
      props.onAdd(result.notes);
    } catch (error) {
      console.error('Fetch error:', error);
    }
	};


  return (
    <div className="create-note">
      <form  >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
