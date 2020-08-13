import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import reactLogo from '../logo.svg'

export default class Navigation extends Component {
    render() {
        return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
             
            <NavLink className="navbar-brand" to="/">
                <img
                alt=""
                src={reactLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />
                {' '}
                MERN NotesApp
            </NavLink>
           
           
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink className="navlink" to="/">Notes</NavLink>
                    <NavLink className="navlink" to="/create">Create Note</NavLink>
                    <NavLink className="navlink" to="/user">Create User</NavLink>
                </Nav>
            </Navbar.Collapse>
            
      </Navbar>
        )
    }
}
