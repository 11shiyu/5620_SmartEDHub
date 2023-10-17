import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                        <Nav.Link as={Link} to="/Message">Message</Nav.Link>
                        <Nav.Link as={Link} to="/ProfileStudent">Student Profile</Nav.Link>
                        <Nav.Link as={Link} to="/ProfileTeacher">Teacher Profile</Nav.Link>
                        {/* 以下是一个下拉示例，你可以根据需要修改它 */}                   
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;