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
        if (id == 'new') return
        let response = await fetch(`http://localhost:8000/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }


    const createNote = async () => {
        await fetch(`http://localhost:8000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
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

    let deleteNote =  async () => {
        await fetch(`http://localhost:8000/notes/${id}` , {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        } )
        navigate('/')
    }

    let handleSubmit = () => {
        if(id !== 'new' && !note.body) {
            deleteNote()
        } else if(id !== 'new') {
            updateNote()
        } else if(id === 'new' && note !== null) {
            createNote()
        }
       
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
        {id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
        ) :(
             <button onClick={handleSubmit}>Done</button>
        )}
        
      </div>
    );
}

export default NotePage