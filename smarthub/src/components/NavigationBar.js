import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';




const NavigationBar = () => {
    const userRole = sessionStorage.getItem('role');  // 获取用户角色
    const navigate = useNavigate();
    console.log("user role:", userRole);

    const handleLogout = () => {
        sessionStorage.clear();  // 清除session
        navigate('/Login');  // 将用户重定向到登录页面
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {userRole === '1' && (
                            <>
                                <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                                <Nav.Link as={Link} to="/Message">Message</Nav.Link>
                                <Nav.Link as={Link} to="/ProfileStudent">Student Profile</Nav.Link>
                            </>
                        )}

                        {userRole === '2' && (
                            <>
                                <Nav.Link as={Link} to="/AIPractice">AI Practice</Nav.Link>
                                <Nav.Link as={Link} to="/ProfileTeacher">Teacher Profile</Nav.Link>
                            </>
                        )}

                        {userRole === '3' && (
                            <>
                                <Nav.Link as={Link} to="/AdminPanel">AdminPanel</Nav.Link>
                            </>
                        )}
                        {!userRole && (
                            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                        )}
                        {userRole && (
                            <Nav className="ms-auto">  {/* 使用ms-auto将Logout按钮推到右边 */}
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;