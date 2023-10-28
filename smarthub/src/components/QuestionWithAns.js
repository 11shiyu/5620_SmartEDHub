import React, { useState, useEffect } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';

function QuestionWithAns({show, handleClose, questionId, questionTitle, questionDetail}) {
    const [answer, setAnswer] = useState('');
    const questionID = parseInt(questionId);
    const studentId = parseInt(JSON.parse(sessionStorage.getItem('studentInfo')).studentId);

    
    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };


    const handleSubmit = async () => {
        //调用传答案的接口
        try {
            console.log("api url:", `http://localhost:8090/question/studentAnswer?answer=${answer}&questionId=${questionID}&studentId=${studentId}`)
            const response = await fetch(`http://localhost:8090/question/studentAnswer?answer=${answer}&questionId=${questionID}&studentId=${studentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': window.sessionStorage.getItem("tokenStr")
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            handleClose();
        } catch (error) {
            console.error('Failed to submit answer:', error);
        }
    };

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{color: '#feae3a'}}><strong>{questionTitle}</strong></h4>
                <p style={{marginTop: '30px'}}>{questionDetail}</p>
                <Form.Group controlId="answer" style={{marginTop: '30px'}}>
                    <Form.Label>Write your Answer:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={answer} onChange={handleAnswerChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default QuestionWithAns;