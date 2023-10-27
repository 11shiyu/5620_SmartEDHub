import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import ClassList from '../components/ClassList';
import CreateClassModal from '../components/CreateClassModal';

function ClassManagement() {
    const navigate = useNavigate(); 
    const [classes, setClasses] = useState([]); // 初始化课程数据状态
    const [showModal, setShowModal] = useState(false);
    const teacherUsername = JSON.parse(sessionStorage.getItem('teacherInfo')).username;
    const [studentIds, setStudentIds] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    async function fetchClassStudents(classId) {
        try {
          const response = await fetch(`http://localhost:8090/classroom/showClassStudent?classId=${classId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const studentData = await response.json();
          if (studentData.code === 200 && studentData.data) {
            // 获取学生 ID 列表
            const studentIds = studentData.data.map(student => student.studentId);
            setStudentIds(studentIds);
          }
        } catch (error) {
          console.error('Failed to fetch class students:', error);
        }
    }

    useEffect(() => {

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
                fetchClassStudents(classItem.classId);
                const countStudent = await countResponse.text();
                return {
                    classID: classItem.classId,
                    className: classItem.classname,
                    teacherName: classItem.username,
                    countStudent: countStudent,
                    studentIds: studentIds
                };
              }));
              setClasses(classesList);
            } catch (error) {
              console.error('Failed to fetch classes:', error);
            }
        };
        
        fetchClasses();
    }, [refreshTrigger]);

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
                                setRefreshTrigger={setRefreshTrigger}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ClassManagement;