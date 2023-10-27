import React, { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

function QuestionWithoutAns({show, handleClose, questionId}) {
    const [questionContent, setQuestionContent] = useState({});
    const questionID = parseInt(questionId);

    const fetchQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:8090/question/getQuestionById?questionId=${questionID}`, {
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
        fetchQuestion();

        if(questionContent) {
            console.log(questionContent);
        } else {
            console.log("Not found questionContent");
        }

    }, [])

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{color: '#feae3a'}}><strong>{questionContent.questionTitle}</strong></h4>
                <p style={{marginTop: '30px'}}>{questionContent.questionDetail}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );

}


export default QuestionWithoutAns;