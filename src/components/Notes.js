import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    let navigate = useNavigate();
    const [note, setNote] = useState({ id: "", etag: "Default", etitle: "", edescription: "" })
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getAllNotes()
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNotes = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etag: currentNote.tag, etitle: currentNote.title, edescription: currentNote.description })
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = () => {
        editNote(note.id, note.etag, note.etitle, note.edescription)
        refClose.current.click()
        props.showAlert("Note Updated Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: "#ADDFFF" }}>
                            <h4 className="modal-title" id="exampleModalLabel" style={{ fontWeight: "bold", textShadow: "3px 2px white" }}>Update Note</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='text-light rounded' style={{ width: "100%", border: "1px solid white" }}>
                                <div className="form-group m-3">
                                    <label className='font-weight-bold text-dark'>Email New Tag</label>
                                    <input type="text" style={{ border: "3px solid #ADDFFF" }} className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} placeholder="Enter New Note Tag" minLength={3} required />
                                </div>
                                <div className="form-group m-3">
                                    <label className='font-weight-bold text-dark'>Email New Title</label>
                                    <input type="text" style={{ border: "3px solid #ADDFFF" }} className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} placeholder="Enter New Note Title" minLength={3} required />
                                </div>
                                <div className="form-group m-3">
                                    <label className='text-dark font-weight-bold'>Enter New Description</label>
                                    <textarea type="text" style={{ border: "3px solid #ADDFFF" }} cols="10" rows="5" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} placeholder="Enter New Note Description" minLength={5} required />
                                </div>
                                <center>
                                    <button ref={refClose} type="button" onClick={handleClick} className="mb-1 btn mx-3" data-bs-dismiss="modal" style={{ border: "1px solid black", background: "#ADDFFF" }}>Close</button>
                                    <button type="button" onClick={handleClick} className="mb-1 btn mx-3" style={{ border: "1px solid black", background: "#ADDFFF" }} disabled={note.etag.length < 3 || note.etitle.length < 3 || note.edescription.length < 5}>Update Note</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4" style={{ height: "auto", overflow: 'hidden' }}>
                <center>
                    <div style={{ border: "4px solid white", borderRadius: "30px", fontWeight: "bold", height: "auto", width: "25%", background: "#ADDFFF" }}>
                        <h1 className='text-ligt m-2 mb-3 p-1' style={{ width: "100%", textShadow: "3px 2px white" }}>Your Notes</h1>
                    </div>
                </center>
                {notes.length === 0 ?
                    <center>
                        <div style={{ margin: "2em", border: "1px solid white", borderRadius: "30px", fontWeight: "bold", height: "auto", width: "40%" }}>
                            <h5 className='text-ligt m-2 mb-3 p-3 rounded' style={{ color: "white", textShadow: "3px 2px black", width: "100%" }}>No Notes Here To Display! Please Add Notes.</h5>
                        </div>
                    </center> : ""
                }
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNotes={updateNotes} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes