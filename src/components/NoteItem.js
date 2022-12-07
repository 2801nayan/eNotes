import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNotes } = props;
    return (
        <div className='col-md-3' style={{overflow: 'hidden'}}>
            <div className="card text-white my-5 " style={{overflow: 'hidden',background : "white",border: "4px solid white",borderRadius:"15px"}}>
                <div className="card-header text-black" style={{background : "#ADDFFF"}}>
                    <b>Tag : </b> {note.tag}
                    <div className='float-end'>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success");}}  style={{color: "darkblue"}}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNotes(note)}} style={{color: "darkblue"}}></i>    
                    </div>
                </div>
                <div className="card-body">
                    <h6 className='text-dark'><b className='text-dark'>Title : </b>{note.title}</h6>
                    <p className="card-text text-dark">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem