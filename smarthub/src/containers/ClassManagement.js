import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import ClassList from '../components/ClassList';
import CreateClassModal from '../components/CreateClassModal';

function ClassManagement() {
    const navigate = useNavigate(); 
    const [classes, setClasses] = useState([]); // 初始化课程数据状态
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const fetchClasses = async () => {
            try {
              const classListResponse = await fetch('http://localhost:8090/classroom/teacherGetClassroomList?teacherUsername=S005&classname=', {
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
              const classesList = await Promise.all(classData.data.map (async (classItem) => {
                const countResponse = await fetch(`http://localhost:8090/classroom/countStudent?classId=${classItem.classId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头部
                        'Authorization': sessionStorage.getItem("tokenStr")
                    }
                });

                if (!countResponse.ok) {
                    throw new Error(`HTTP error! status: ${countResponse.status}`);
                }

                const countStudent = await countResponse.text();
                return {
                    classID: classItem.classId,
                    className: classItem.classname,
                    teacherName: classItem.username,
                    countStudent: countStudent
                };
              }));
              setClasses(classesList);
            } catch (error) {
              console.error('Failed to fetch classes:', error);
            }
        };
        
        fetchClasses();
    }, []);

    const handleBackClick = () => {
        navigate('/ProfileTeacher');
    };

    return(
        <div style={{marginTop: '15px'}}>
            <Container fluid>
                <Row>
                    <Col md={1}>
                        <div>
                            {/* 添加Back按钮，当点击时触发handleBackClick方法 */}
                            <Button variant="primary" onClick={handleBackClick}>Back</Button>
                        </div>
                    </Col>
                    <Col md={{span: 8, offset: 1}} >
                        <div className='classList'>
                            <h2>Class List</h2>
                            <ClassList classes={classes} setClasses={setClasses} />
                        </div>
                    </Col>
                    <Col md={2} >
                        <div>
                            <Button onClick={() => setShowModal(true)}>Add Class</Button>
                            <CreateClassModal 
                                show={showModal} 
                                handleClose={() => setShowModal(false)} 
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ClassManagement;