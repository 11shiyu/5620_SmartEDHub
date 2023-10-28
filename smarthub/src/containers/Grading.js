import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import AnswerList from '../components/AnswerList';

function Grading() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    useEffect(() => {

    }, []);

    return (
        <div style={{marginTop: '1vw'}}>
            <Container fluid>
                <Row>
                    <Col md={1}>
                        <div>
                            <Button variant="primary" onClick={handleBackClick}>Back</Button>
                        </div>
                    </Col>
                    <Col md={{span: 8, offset: 1}} >
                        <div className='GradingList'>
                            <h2>Grading List</h2>
                            <Form>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Grading;