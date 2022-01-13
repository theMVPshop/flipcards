import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarHeader.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav  from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';


export default function NavbarHeader() {
    return (
     <Navbar className='navbarHeader' collapseOnSelect expand="lg" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Study Cards</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#library">Your Library</Nav.Link>
    </Nav>
        {/* Appears after logged in, else Sign In appears */}
    <Nav>
    <NavDropdown className='adminUser' title="Admin User" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/">Profile</NavDropdown.Item>
        <NavDropdown.Item href="/">Progress</NavDropdown.Item>
        <NavDropdown.Item href="/">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

