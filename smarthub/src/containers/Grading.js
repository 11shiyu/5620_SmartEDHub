import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import AnswerList from '../components/AnswerList';

function Grading() {
    const navigate = useNavigate();
    const teacherUsername = JSON.parse(sessionStorage.getItem('teacherInfo')).username;

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    const [ansListData, setAnsListData] = useState([]);

    const fetchAnswerList = async (teacher_username) => {
        try {
            const response = await fetch(`http://localhost:8090/question/teacherGetAnsweredList?teacher_username=${teacher_username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            const answerListData = await Promise.all(responseData.data.map (async (answerItem) => { 
                return {
                    questionStudentId: answerItem.questionStudentId,
                    questionId: answerItem.questionId,
                    studentId: answerItem.studentId,
                    classname: answerItem.classname,
                    questionAnswer: answerItem.questionAnswer,
                    questionMark: answerItem.mark
                };
            }));
            setAnsListData(answerListData);

        } catch (error) {
            console.error('Failed to fetch answer list:', error);
        }
    };

    useEffect(() => {
        fetchAnswerList(teacherUsername);
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
                            <AnswerList ansListData={ansListData} setAnsListData={setAnsListData}/>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Grading;