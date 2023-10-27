import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Container, Row, Col, Button} from 'react-bootstrap';
import '../css/Styles.css';
import SelectClassModal from '../components/SelectClassModal';

function GenerateAssign() {

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    const handleCancelClick = () => {
        navigate('/CreateAssignment');
    };

    const location = useLocation();
    const questionSet = location.state?.formData;
    const questionData = location.state?.questionData;
    const teacherUsername = JSON.parse(sessionStorage.getItem('teacherInfo')).username;

    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState([]);
    const [modifiedQuestionData, setModifiedQuestionData] = useState(questionData);

    const fetchClasses = async () => {
        try {
            const classListResponse = await fetch(`http://localhost:8090/classroom/teacherGetClassroomList?teacherUsername=${teacherUsername}&classname=`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                }
            });
    
            if (!classListResponse.ok) {
                throw new Error(`HTTP error! status: ${classListResponse.status}`);
            }

            const classData = await classListResponse.json();
            const classDetail = classData.data.map(classItem => {
                return {
                    classname: classItem.classname,
                    classId: classItem.classId
                };
            });
            setClasses(classDetail);
        } catch (error) {
            console.error('Failed to fetch classes:', error);
        }
    };

    useEffect(() => {
        // 在这里调用API从数据库获取班级信息
        fetchClasses();

        if(questionData) {
            console.log(questionData);

            if (questionSet.questionType === '2') {
                setModifiedQuestionData(questionData.data);
            }

        } else {
            console.log("Not found questionData")
        }

    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return(
        <div style={{marginTop: '15px'}}>
            <Container fluid>
                <Row>
                    <Col md={1}>
                        <div>
                            <Button variant="primary" onClick={handleBackClick}>Back</Button>
                        </div>
                    </Col>

                    <Col md={{span: 8, offset: 1}} >
                        <div>
                            <h2>Generated Question</h2>
                            <div style={{textAlign: 'left', marginTop: '60px'}}>
                                <p><strong>Subject: </strong> {questionSet.subject}</p>
                                <p><strong>Level: </strong> {questionSet.level}</p>
                                <p><strong>Requirements: </strong> {questionSet.requirements}</p>
                                <p><strong>Question Type: </strong> {questionSet.questionType}</p>

                            </div>
                            <div style={{textAlign: 'left', marginTop: '40px'}}>
                                <div className='questionContent'>
                                    <h4 style={{color: '#feae3a'}}><strong>{modifiedQuestionData.questionTitle}</strong></h4>
                                    <p style={{marginTop: '30px'}}>{modifiedQuestionData.questionDetail}</p>
                                </div>
                            </div>
                            <div style={{marginBottom: '40px'}}>
                                <Button variant="secondary" onClick={handleCancelClick} style={{marginRight: '5%'}}>Cancel</Button>
                                <Button variant="primary" onClick={handleShowModal}>Confirmed</Button>
                                <SelectClassModal 
                                    show={showModal} 
                                    handleClose={handleCloseModal} 
                                    classes={classes} 
                                    questionId={questionData.questionId}
                                />
                            </div>
                        </div>
                    </Col>


                </Row>
            </Container>
        </div>
    );
}

export default GenerateAssign;