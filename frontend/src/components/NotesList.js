import React, { Component } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import { format } from "timeago.js";

export default class NotesList extends Component {

    state={
        notes: []
    }

    async componentDidMount(){
        this.getNotes()
    }

    getNotes =  async ()=>{
        const res = await axios.get('/api/notes')
        this.setState({notes: res.data})
    }

    deleteNote = async (id) => {
        await axios.delete('/api/notes/'+id)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                 {this.state.notes.map(note => 
                        <div className="col-md-4 p-2" key={note._id} >
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>  
                                    <NavLink className="btn btn-secondary" to={'/edit/'+note._id}>Edit</NavLink>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                </div>
                                <div className="card-footet">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                 )}
            </div>
        )
    }
}
