import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
    <Navbar bg='info' data-bs-theme='info' className='p-3' expand='md'>
        <Navbar.Brand href='/'>ToDo App</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <Link to='/login' className='nav-link'>
                    Login
                    </Link>
                    <Link to='/todo' className='nav-link'>
                    ToDos
                    </Link>
                    <Link to='/categories' className='nav-link'>
                    Categories
                    </Link>
                </Nav>

            </Navbar.Collapse>

           
    </Navbar>
  )
}
