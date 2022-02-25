import React from 'react';
import cookie from 'cookie';

import './NavbarHeader.css'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
// import { Link } from 'react-router-dom';

export default function NavbarHeader() {

  const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    return cookies['loggedIn'] ? true : false;
  }

  return (
    <Navbar className='navbarHeader' collapseOnSelect expand="lg" bg="dark" variant="dark">
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
              <NavDropdown className='adminUser' title="Admin User" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/">Progress</NavDropdown.Item>
                <NavDropdown.Item href="/">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
