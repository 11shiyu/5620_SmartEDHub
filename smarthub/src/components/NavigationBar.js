import React, {useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


//const teacherDetail = JSON.parse(sessionStorage.getItem('teacherInfo'));
//const studentDetail = JSON.parse(sessionStorage.getItem('studentInfo'));

const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* {isLoggedInState && studentDetail && (
                            <>
                                <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                                <Nav.Link as={Link} to="/Message">Message</Nav.Link>
                                <Nav.Link as={Link} to="/ProfileStudent">Student Profile</Nav.Link>
                            </>
                        )}
                        
                        {isLoggedInState && teacherDetail && (
                            <>
                                <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                                <Nav.Link as={Link} to="/ProfileTeacher">Teacher Profile</Nav.Link>
                            </>
                        )}
                        
                        {!isLoggedInState && (
                            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                        )} */}
                        <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                        <Nav.Link as={Link} to="/Message">Message</Nav.Link>
                        <Nav.Link as={Link} to="/ProfileStudent">Student Profile</Nav.Link>
                        <Nav.Link as={Link} to="/ProfileTeacher">Teacher Profile</Nav.Link>
                        <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/AdminPanel">AdminPanel</Nav.Link>             
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;