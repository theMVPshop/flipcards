import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'cookie';

import './NavbarHeader.css'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function NavbarHeader() {
  const loggedInUser = () => {
    const cookies = cookie.parse(document.cookie);
    return cookies['email'];
  }

  const [user, setUser] = useState(loggedInUser);

  const navigate = useNavigate();

  const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    return cookies['loggedIn'] ? true : false;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    document.cookie = `token=`;
    document.cookie = `firstname=`;
    document.cookie = `lastname=`;
    document.cookie = `email=`;
    document.cookie = `program=`;
    document.cookie = `userId=`;
    document.cookie = `loggedIn=`;
    navigate('/');
  }

  return (
    <Navbar className='navbarHeader' collapseOnSelect expand="lg" bg="#1a1d28" variant="dark">
      <Container className="nav">
        <Navbar.Brand href="/">Study Cards</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {checkAuth() && (
              <Nav.Link href="/dashboard">Your Library</Nav.Link>
            )}
          </Nav>
          {/* Appears after logged in, else Sign In appears */}
          {checkAuth() && (
            <Nav>
              <NavDropdown className='adminUser' title={user} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/updateprofile" className='navbarUpdateLink'>Update Profile</NavDropdown.Item>
                <NavDropdown.Item href="/approveusers" className='navbarUpdateLink'>Approve Users</NavDropdown.Item>
                <NavDropdown.Item href="/">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item href="/">Logout</NavDropdown.Item> */}
                <Button variant="link" onClick={(e) => handleLogout(e)}>Logout</Button>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
