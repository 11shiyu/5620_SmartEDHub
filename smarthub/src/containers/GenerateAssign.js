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

    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState([]);

    if(questionData) {
        console.log(questionData);
    } else {
        console.log("Not found questionData")
    }

    useEffect(() => {
        // 在这里调用API从数据库获取班级信息
        //fetch
        //测试
        const fetchedClasses = [
            { id: '1', name: 'ClassA' },
            { id: '2', name: 'ClassB' },
            { id: '3', name: 'ClassC' },
        ];
        setClasses(fetchedClasses);
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
                                <p><strong>Question Type: </strong> {questionSet.questionType}</p>
                                <p><strong>Requirements: </strong> {questionSet.requirements}</p>

                            </div>
                            <div style={{textAlign: 'left', marginTop: '20px'}}>
                                <p style={{color: '#feae3a'}}><strong>Question Contents: </strong></p>
                                <div className='questionContent'>
                                    <h3>{questionData.questionTitle}</h3>
                                    <p>{questionData.questionDetail}</p>
                                </div>
                            </div>
                            <div style={{marginBottom: '40px'}}>
                                <Button variant="warning" onClick={handleCancelClick} style={{marginRight: '5%'}}>Cancel</Button>
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