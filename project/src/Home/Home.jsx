import React, { useState } from "react";
import Note from "../Note/Note";
import CreateArea from "./CreateArea";



function Home(props){



const [notes, setNotes] = useState(props.User.notes);
  
function RenderNote(Note) {
  setNotes(Note);
}


return(

<div>

<CreateArea User={props.User} onAdd={RenderNote} />
      {notes.map((noteItem, index) => {
        return (
         
          <Note
            key={index}
            id={noteItem._id}//replace it with note id
            title={noteItem.title}
            client_id={props.User._id}
            content={noteItem.content}
            onDelete={RenderNote}
          />
         
        );
      })}
      
</div>

 )


}


export default Home;