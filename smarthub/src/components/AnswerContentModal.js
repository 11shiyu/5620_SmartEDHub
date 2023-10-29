import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AnswerContentModal({show, handleClose, answerData}) {
    const [markScore, setMarkScore] = useState('');
    const [questionContent, setQuestionContent] = useState({});
    const questionId = parseInt(answerData.questionId);

    const fetchQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:8090/question/getQuestionById?questionId=${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const questionData = await response.json();
            const questionDetail = {
                questionTitle: questionData.data.questionTitle,
                questionDetail: questionData.data.questionDetail,
                questionType: questionData.data.questionType
            };

            setQuestionContent(questionDetail);
        } catch(error) {
            console.error('Failed to fetch question:', error);
        }
    };
    useEffect(() => {
        if (!show) {
            setMarkScore('');
        } else {
            fetchQuestion();

            if(questionContent) {
                console.log(questionContent);
            } else {
                console.log("Not found questionContent");
            }
        }
    }, [show]);

    const handleSubmit = async () => {
        const markScoreInt = parseInt(markScore);
        try {
            const response = await fetch(`http://localhost:8090/question/teacherMark?mark=${markScoreInt}&question_student_id=${answerData.questionStudentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Mark successfully')
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Failed to mark the answer:', error);
        }
    }
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Grading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h4 style={{color: '#feae3a'}}><strong>{questionContent.questionTitle}</strong></h4>
                    <p style={{marginTop: '30px'}}>{questionContent.questionDetail}</p>
                </div>
                <div style={{marginTop: '50px'}}>
                    <p><strong>Student Answer: </strong> {answerData.questionAnswer}</p>
                </div>
                <Form style={{marginTop: '50px'}}>
                    <Form.Group>
                        <Form.Label>Mark Score:</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={markScore} 
                            onChange={(e) => setMarkScore(e.target.value)} 
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Mark</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AnswerContentModal;


