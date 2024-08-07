import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"

const NotePage = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  let [note, setNote] = useState([])

  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id == 'new') return
    let response = await fetch(`http://localhost:8000/notes/${id}`)
    let data = await response.json()
    setNote(data)
}

const createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
}


const updateNote = async () => {
    console.log("Update note function called")
    await fetch(`http://localhost:8000/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
}

const deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    navigate('/')
}

let handleSubmit = () => {
    if (id != "new" && !note.body) {
        deleteNote()
    } else if (id != "new") {
        console.log("Inside Update note function called")
        updateNote()
    } else if (id === 'new' && note.body !== null) {
        createNote()
    }

    navigate('/')
}


return (
    <div className="note">
        <div className="note-header">
            <h3>
                <Link to={'/'}>
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            {id != 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ) : (
                <button onClick={handleSubmit}>Done</button>
            )}

        </div>
        <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder="Edit note" value={note?.body}></textarea>
    </div>
    )   
}

export default NotePage
