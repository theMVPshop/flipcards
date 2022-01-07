import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarHeader.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav  from 'react-bootstrap/Nav';


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
    <NavDropdown title="Admin User" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Progress</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

