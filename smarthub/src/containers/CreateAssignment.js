import React, { useState} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function CreateAssignment() {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    const [formData, setFormData] = useState({
        level: '',
        questionType: '',
        requirements: '',
        subject: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        //如果requirements内容为空，就删掉他
        const updatedFormData = {...formData};
        if (!updatedFormData.requirements || updatedFormData.requirements.trim() === '') {
            delete updatedFormData.requirements;
        }

        // 在这里添加将表单数据发送到服务器的代码
        try {
            const response = await fetch('http://localhost:8090/teacherGenerateQuestionsByGPT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const questionData = await response.json();
            console.log('Form Data Submitted:', questionData);

            navigate('/GenerateAssign', { state: { formData: formData, questionData: questionData.data } });

        } catch (error) {
            console.error(`Could not submit form. Error: ${error}`);
        } finally {
            setIsLoading(false); // 结束加载
        }
        
    };

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
                        <div className='CreateAssignment'>
                            <h2>Create Assignment By AI</h2>
                            <Form onSubmit={handleSubmit}>
                                <Row style={{marginTop: '4vw'}}>
                                    <Form.Group as={Col} controlId="formGridSubject">
                                        <Form.Label style={{color: '#feae3a'}}>Subject*</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="subject" 
                                            value={formData.subject} 
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value= ''>Select...</option>
                                            <option value= 'Maths'>Maths</option>
                                            <option value= 'Physics'>Physics</option>
                                            <option value= 'Chemistry'>Chemistry</option>
                                            <option value= 'Biology'>Biology</option>
                                            <option value= 'History'>History</option>
                                            <option value= 'Geography'>Geography</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridLevel">
                                        <Form.Label style={{color: '#feae3a'}}>Level*</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="level" 
                                            value={formData.level} 
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value= ''>Select...</option>
                                            <option value= 'Primary School'>Primary School</option>
                                            <option value= 'Middle School'>Middle School</option>
                                            <option value= 'High School'>High School</option>
                                            <option value= 'Undergraduate'>Undergraduate</option>
                                            <option value= 'PhD'>PhD</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridQuestionType">
                                        <Form.Label style={{color: '#feae3a'}}>Type of Question*</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="questionType" 
                                            value={formData.questionType} 
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value= ''>Select...</option>
                                            <option value= '2'>Multiple-choice question</option>
                                            <option value= '3'>Fill-in-the-blank question</option>
                                            <option value= '4'>Short answer question</option>
                                            <option value= '5'>Open question</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>

                                <Form.Group controlId="formGridRequirements" style={{marginTop: '8vw'}}>
                                    <Form.Label style={{color: '#feae3a'}}>Question Requirement (Optional)</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={5} 
                                        name="requirements" 
                                        value={formData.requirements} 
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{marginTop: '8vw', marginBottom: '3vw'}}>
                                    Submit
                                </Button>
                            </Form>
                        </div>
                        <div>
                            {isLoading && (
                                <div className="overlay">
                                    <div className="loader"></div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CreateAssignment;