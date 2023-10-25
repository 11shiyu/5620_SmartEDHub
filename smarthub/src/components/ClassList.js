import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EditStudentsModal from './EditStudentsModal';

//假设的API方法，用于从数据库删除特定ID的课程
const deleteClassFromDB = async (id) => {
    try {
        const response = await fetch('http://localhost:8090/classroom/deleteClassroom', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`Deleted class with ID: ${id}`);
    } catch (error) {
        console.error(`Could not delete class with ID: ${id}. Error: ${error}`);
    }
};
  
function ClassList({ classes, setClasses }) { 
    const [showModal, setShowModal] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [error, setError] = useState(null);

    const checkStudentExistsInDB = async (studentId) => {
        // 在这里调用API来查询数据库中的学生ID, 通过返回一个布尔值，判断学生是否存在

        //测试
        return true;
    };
  
    const handleDelete = async (id) => {
        // 删除数据库中的数据
        await deleteClassFromDB(id);
        
        // 更新状态，移除已删除的课程
        const updatedClasses = classes.filter(c => c.classID !== id);
        setClasses(updatedClasses);
    };

    const handleEdit = (classItem) => {
        setCurrentClass(classItem);
        setShowModal(true);
    };

    const handleAddStudent = async (studentId) => {
        if (currentClass) {
            const studentExists = await checkStudentExistsInDB(studentId);
            if (!studentExists) {
                setError(`Student with ID ${studentId} does not exist.`);
                return;
            }
    
            const updatedClasses = classes.map(c => {
                if (c.classID === currentClass.classID) {
                    return { ...c, studentID: [...c.studentID, studentId] };
                }
                return c;
            });
            setClasses(updatedClasses);
            setShowModal(false);
        }
    };

    const handleRemoveStudent = (studentId) => {
        if (currentClass) {
            // 检查班级中是否有该学生
            if (!currentClass.studentID.includes(studentId)) {
                setError(`Student with ID ${studentId} does not exist in this class.`);
                return;
            }

            const updatedClasses = classes.map(c => {
                if (c.classID === currentClass.classID) {
                    return { ...c, studentID: c.studentID.filter(id => id !== studentId) };
                }
                return c;
            });
            setClasses(updatedClasses);
            setShowModal(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setError(null); // 清空错误消息
    };
  
    return (
        <div>
            {classes.map((classItem) => (
                <Card key={classItem.classID} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        <Card.Title>{classItem.className}</Card.Title>
                        <Card.Text>
                            <strong>Teacher ID:</strong> {classItem.teacherID} <br/>
                            <strong>Number of Students:</strong> {classItem.studentID.length}
                        </Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(classItem.classID)}>Delete</Button>
                        <Button variant="warning" style={{ marginLeft: '10px' }} onClick={() => handleEdit(classItem)}>Edit Students</Button>
                    </Card.Body>
                </Card>
            ))}

            <EditStudentsModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                handleAdd={handleAddStudent} 
                handleRemove={handleRemoveStudent} 
                currentClass={currentClass}
                error={error}
                setError={setError}
            />
        </div>
    );
}

export default ClassList;