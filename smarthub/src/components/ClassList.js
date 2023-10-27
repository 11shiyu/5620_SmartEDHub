import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EditStudentsModal from './EditStudentsModal';

  
function ClassList({ classes, setClasses }) { 
    const [showModal, setShowModal] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const [error, setError] = useState(null);

    //用于从数据库删除特定ID的课程
    const deleteClassFromDB = async (id) => {
        try {
            const studentInClassResponse = await fetch(`http://localhost:8090/classroom/showClassStudent?classId=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });
    
            if (!studentInClassResponse.ok) {
                throw new Error(`HTTP error! status: ${studentInClassResponse.status}`);
            }
    
            const studentInClassdata = await studentInClassResponse.json();
            const studentIds = studentInClassdata.data.map(student => student.studentId);
    
            for (const studentId of studentIds) {
                try {
                    const removeStudentResponse = await fetch(`http://localhost:8090/classroom/deleteStudent?classId=${id}&studentId=${studentId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': sessionStorage.getItem("tokenStr")
                        },
                    });
                    if (!removeStudentResponse.ok) {
                        throw new Error(`HTTP error! status: ${removeStudentResponse.status}`);
                    }
                } catch (error) {
                    console.error(`Could not remove student with ID: ${studentId} to class with ID: ${currentClass.classID}. Error: ${error}`);
                    setError(`Could not remove student with ID: ${studentId} to class. Please try again later.`);
                }
            }
    
            const deleteResponse = await fetch(`http://localhost:8090/classroom/deleteClassroom?classroomId=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });
            if (!deleteResponse.ok) {
                throw new Error(`HTTP error! status: ${deleteResponse.status}`);
            }
            console.log(`Deleted class with ID: ${id}`);
        } catch (error) {
            console.error(`Could not delete class with ID: ${id}. Error: ${error}`);
        }
    };

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
    
            try {
                const addStudentResponse = await fetch(`http://localhost:8090/classroom/addToClassroom?classId=${currentClass.classID}&studentId=${studentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("tokenStr")
                    },
                });
    
                if (!addStudentResponse.ok) {
                    throw new Error(`HTTP error! status: ${addStudentResponse.status}`);
                }
                console.log('Add Student Successfully');
                const updatedClasses = classes.map(c => {
                    if (c.classID === currentClass.classID) {
                        return { ...c, studentIds: [...c.studentIds, studentId] };
                    }
                    return c;
                });
                setClasses(updatedClasses);
                setShowModal(false);
            } catch (error) {
                console.error(`Could not add student with ID: ${studentId} to class with ID: ${currentClass.classID}. Error: ${error}`);
                setError(`Could not add student with ID: ${studentId} to class. Please try again later.`);
            }
        }
    };

    const handleRemoveStudent = async (studentId) => {
        if (currentClass) {
            // 检查班级中是否有该学生
            if (!currentClass.studentIds.includes(studentId)) {
                setError(`Student with ID ${studentId} does not exist in this class.`);
                return;
            }

            try {
                const removeStudentResponse = await fetch(`http://localhost:8090/classroom/deleteStudent?classId=${currentClass.classID}&studentId=${studentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem("tokenStr")
                    },
                });
                if (!removeStudentResponse.ok) {
                    throw new Error(`HTTP error! status: ${removeStudentResponse.status}`);
                }
                console.log('Remove Student Successfully');
                const updatedClasses = classes.map(c => {
                    if (c.classID === currentClass.classID) {
                        return { ...c, studentIds: c.studentIds.filter(id => id !== parseInt(studentId)) };
                    }
                    return c;
                });
                setClasses(updatedClasses);
                setShowModal(false);
            } catch (error) {
                console.error(`Could not remove student with ID: ${studentId} to class with ID: ${currentClass.classID}. Error: ${error}`);
                setError(`Could not remove student with ID: ${studentId} to class. Please try again later.`);
            }
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
                            <strong>Class ID:</strong> {classItem.classID} <br/>
                            <strong>Teacher Name:</strong> {classItem.teacherName} <br/>
                            <strong>Number of Students:</strong> {classItem.countStudent}
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