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
        // 假设 fetchClassesFromDB 是一个函数，用于从数据库获取所有班级
        // const fetchedClasses = await fetchClassesFromDB();
        // setClasses(fetchedClasses);

        //测试
        const demoClasses = [
            { classID: 1, studentID: ['S001','S002','S003','S004'], teacherID: 'T001', className: 'Math 101' },
            { classID: 1, studentID: ['S005','S006','S007','S008', 'S009'], teacherID: 'T001', className: 'Math 105' },
        ];
        setClasses(demoClasses);
    }, []);

    // 假设的API方法，用于创建新的班级
    const createNewClassInDB = async (classData) => {
        // 在这里可以调用API来在数据库中创建新的班级
        console.log(`Created new class with data:`, classData);
        // 假设返回新创建的班级数据
        return classData;
    };

    const handleBackClick = () => {
        navigate('/ProfileTeacher');
    };

    const handleCreateClass = (className) => {
        const newClassData = {
            classID: Math.random().toString(36).substr(2, 9), // 生成一个随机ID
            studentID: [],
            teacherID: 'someTeacherID', // 你可能需要从其他地方获取这个值
            className: className
        };

        // 调用应用程序接口在数据库中创建类，然后更新状态

        //测试
        setClasses([...classes, newClassData]);
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
                                handleCreate={handleCreateClass}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ClassManagement;