import React, {useState, useEffect} from 'react'
//import notes from '../assets/data'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    let {id} = useParams();
    const navigate = useNavigate(); 

    useEffect(()=> {
        getNote()
    }, [id])

    let [ note, setNote] = useState([]);

    let getNote = async () => {
        let response = await fetch(`http://localhost:8000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote =  async() => {
        await fetch(`http://localhost:8000/notes/${id}` , {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date() })
        } )
    }

    let handleSubmit = () => {
        updateNote()
        navigate('/') // Use navigate for redirection
    }

    const handleChange = (e) => {
        console.log("Textarea value:", e.target.value); // For debugging
        setNote(prevNote => ({ ...prevNote, body: e.target.value }));
    };

    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit} />
            </Link>
          </h3>
        </div>
        <textarea
          onChange={handleChange}
          placeholder="Edit note"
          value={note.body || ""} // Ensure value is always a string
        />
      </div>
    );
}

export default NotePage