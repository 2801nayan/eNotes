import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { newNote } = context;

    const [note, setNote] = useState({tag: "", title : "", description : ""})

    const handleForm = (e)=>{
        e.preventDefault(); 
        newNote(note.tag, note.title, note.description)
        setNote({tag: "", title : "", description : ""})
        props.showAlert("Note Added Successfully", "success")
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    return (
        <div className="container my-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form className='text-light' style={{ border: "4px solid white",borderRadius:"30px",width: "100%", background: "#ADDFFF" }}>
                <center> <h1 className='text-dark mt-2' style={{ fontWeight: "bold", textShadow: "3px 2px white" }}>Add a Note</h1> </center>
                <div className="form-group m-3">
                    {/* <label className='font-weight-bold text-dark'>Email Title</label>  */}
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} placeholder="Enter Note Tag Here" minLength={3} required/>
                </div>
                <div className="form-group m-3">
                    {/* <label className='font-weight-bold text-dark'>Email Title</label>  */}
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} placeholder="Enter Note Title Here" minLength={3} required/>
                </div>
                <div className="form-group m-3">
                    {/* <label className='text-dark font-weight-bold'>Enter Note Description</label> */}
                    <textarea type="text" cols="10" rows="5" className="form-control" id="description" name="description" onChange={onChange} value={note.description} placeholder="Enter Note Description Here" minLength={5} required/>
                </div>
                <center> <button disabled={note.tag.length < 3 || note.title.length < 3 || note.description.length < 5} type="submit" className="mb-3 text-dark btn bg-light" onClick={handleForm}><b>Add Note</b></button> </center>
            </form>
        </div>
    )
}

export default AddNote