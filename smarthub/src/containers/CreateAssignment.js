import React, { useState} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function CreateAssignment() {
    
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    const [formData, setFormData] = useState({
        subject: '',
        level: '',
        questionType: '',
        requirements: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // 在这里添加将表单数据发送到服务器的代码

        //页面跳转
        navigate('/GenerateAssign', { state: { formData } });
    };

    return (
        <div style={{marginTop: '15px'}}>
            <Container fluid>
                <Row>
                    <Col md={1}>
                        <div>
                            <Button variant="primary" onClick={handleBackClick}>Back</Button>
                        </div>
                    </Col>

                    <Col md={{span: 8, offset: 1}} >
                        <div className='CreateAssignment'>
                            <h2>Create Assignment By AI</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row style={{marginTop: '60px'}}>
                                    <Form.Group as={Col} controlId="formGridSubject">
                                        <Form.Label style={{color: '#feae3a'}}>Subject</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="subject" 
                                            value={formData.subject} 
                                            onChange={handleChange}
                                        >
                                            <option>Select...</option>
                                            <option>Math</option>
                                            <option>Physics</option>
                                            <option>Chemistry</option>
                                            <option>Biology</option>
                                            <option>History</option>
                                            <option>Geography</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLevel">
                                        <Form.Label style={{color: '#feae3a'}}>Level</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="level" 
                                            value={formData.level} 
                                            onChange={handleChange}
                                        >
                                            <option>Select...</option>
                                            <option>Primary School</option>
                                            <option>Middle School</option>
                                            <option>High School</option>
                                            <option>Undergraduate</option>
                                            <option>PhD</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridQuestionType">
                                        <Form.Label style={{color: '#feae3a'}}>Type of Question</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="questionType" 
                                            value={formData.questionType} 
                                            onChange={handleChange}
                                        >
                                            <option>Select...</option>
                                            <option>Multiple-choice question</option>
                                            <option>Fill-in-the-blank question</option>
                                            <option>Short answer question</option>
                                            <option>Open question</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>

                                <Form.Group controlId="formGridRequirements" style={{marginTop: '100px'}}>
                                    <Form.Label style={{color: '#feae3a'}}>Question Requirement (Optional)</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        name="requirements" 
                                        value={formData.requirements} 
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{marginTop: '120px'}}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateAssignment;