import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [notes, setNotes] = useState([])

    //Get All Notes
    const getAllNotes = async () => {
        //API call 
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                "content-type" : "application/json",
                "Authorization": "Bearer #ItSjWtToken@Sign$",
                "auth-token" : localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    //Add a Note
    const newNote = async (tag, title, description) => {
        //TODO : API call 
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                "content-type" : "application/json",
                "Authorization": "Bearer #ItSjWtToken@Sign$",
                "auth-token" : localStorage.getItem('token')
            },
            body : JSON.stringify({tag,title,description})
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type" : "application/json",
                "Authorization": "Bearer #ItSjWtToken@Sign$",
                "auth-token" : localStorage.getItem('token')
            }
        });
        const updatedNoteLIst = notes.filter((note)=>{return note._id !== id})
        setNotes(updatedNoteLIst)
    }

    //Edit a Note
    const editNote = async (id, tag, title, description) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                "content-type" : "application/json",
                "Authorization": "Bearer #ItSjWtToken@Sign$",
                "auth-token" : localStorage.getItem('token')
            },
            body : JSON.stringify({tag,title,description})
        });
        
        let NewNotes = JSON.parse(JSON.stringify(notes))
        //edit logic
        for (let index = 0; index < NewNotes.length; index++) {
            const element = NewNotes[index];
            if(element._id === id){
                NewNotes[index].tag = tag
                NewNotes[index].title = title
                NewNotes[index].description = description
                break;
            }
        }
        setNotes(NewNotes);

    }
    return (
        <NoteContext.Provider value={{ notes, newNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;