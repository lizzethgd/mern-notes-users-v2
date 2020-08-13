import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state= {
        users: [],
        userSelected : '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: '',
        cardtitle: ''
    }

    async componentDidMount(){
       const res = await axios.get('/api/users')
       this.setState({
           users: res.data.map(user => user.username),
           userSelected: res.data[0].username,
           cardtitle: 'Create'
       })
       if (this.props.match.params.id){
           const res = await axios.get('/api/notes/'+this.props.match.params.id)
           this.setState({
               userSelected: res.data.author,
               title: res.data.title,
               content: res.data.content,
               date: new Date(res.data.date),
               editing: true, 
               _id: this.props.match.params.id,
               cardtitle: 'Edit'
             })
        }
    }   

    onSubmit = async e => {
        e.preventDefault()
        const newNote = {
            author: this.state.userSelected,
            title: this.state.title,
            content: this.state.content,
            date: this.state.date
        }
        this.state.editing ?
            await axios.put('/api/notes/'+this.state._id, newNote) 
        :
            await axios.post('/api/notes', newNote)
    
        this.props.history.push('/');
    }

    onInputChange= e => {
        this.setState({[e.target.name]: e.target.value })
    }

    onDateChange = date => {
        this.setState({date: date})
        console.log(this.state.date)
    }

    render() {
        return (
       <div className="col-md-6 offset-md-3">
           <div className="card card-body">
        <h4> {this.state.cardtitle} a Note </h4> 
                <div className="form-group">
                    <select className="form-control" name="userSelected" onChange={this.onInputChange} value={this.state.userSelected}>
                        {
                        this.state.users.map(user => <option key={user} value={user}>{user}</option>)
                        }
                     </select>   
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" name="title" placeholder="title" onChange={this.onInputChange} value={this.state.title} required/>
                </div>

                <div className="form-group">
                    <textarea className="form-control" name="content" placeholder="content" onChange={this.onInputChange} value={this.state.content} required></textarea>
                </div>

                <div className="form-group" >
                    <DatePicker className="form-control" selected={this.state.date} onChange={this.onDateChange}  />
                </div>

               <form onSubmit={this.onSubmit}>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
               </form>
           </div>
       </div>
        )
    }
}
