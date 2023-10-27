import React, { useEffect, useState} from 'react';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import AnnouncementModal from '../components/AnnouncementModal';

function Announcement() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/ProfileTeacher'); 
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState([]);
    const teacherUsername = JSON.parse(sessionStorage.getItem('teacherInfo')).username;

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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

        fetchClasses();

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
                    <Col md={{span: 6, offset: 2}}>
                        <div className='CreateAnnoucement'>
                            <h2>Create Announcement</h2>
                            <Form>
                                <Form.Group controlId="announcementTitle" style={{marginTop: '5vw'}}>
                                    <Form.Label><strong>Announcement Title</strong></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        style={{marginTop: '0.5vw'}}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="announcementContent" style={{marginTop: '6vw'}}>
                                    <Form.Label><strong>Announcement Content</strong></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={8}
                                        value={content}
                                        style={{marginTop: '0.5vw'}}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleShowModal} style={{marginTop: '5vw', marginBottom: '3vw'}}>
                                    Create
                                </Button>
                            </Form>

                            <AnnouncementModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                classes={classes}
                                title={title}
                                content={content}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Announcement;