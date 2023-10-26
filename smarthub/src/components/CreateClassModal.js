import {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateClassModal({ show, handleClose, handleCreate }) {
    const [className, setClassName] = useState('');
    const [studentIdInput, setStudentIdInput] = useState('');
    const [studentsInClass, setStudentsInClass] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!show) {
            setClassName('');
            setStudentIdInput('');
            setStudentsInClass([]);
            setError(null);
        }
    }, [show]);

    const checkStudentExistsInDB = async (studentId) => {
        

        //测试
        return true;
    };

    const handleAddStudent = async (studentId) => {
        if (!studentsInClass.includes(studentId)) {
            const studentExists = await checkStudentExistsInDB(studentId);
            if (!studentExists) {
                setError(`Student with ID ${studentId} does not exist.`);
                return;
            } 
            setStudentsInClass(prevStudents => [...prevStudents, studentId]);
        } else {
            setError(`Student with ID ${studentId} is already in the class.`);
        }
    };

    const handleSubmit = async () => {
        try {
            const createClassResponse = await fetch('http://localhost:8090/classroom/createClassroom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
                body: JSON.stringify({ classname: className })
            });

            if (!createClassResponse.ok) {
                throw new Error(`HTTP error! status: ${createClassResponse.status}`);
            }
            //需要更新获取登录的老师用户名
            const getClassIDResponse = await fetch(`http://localhost:8090/classroom/teacherGetClassroomList?teacherUsername=S005&classname=${className}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // 设置请求头部
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });

            if (!getClassIDResponse.ok) {
                    throw new Error(`HTTP error! status: ${getClassIDResponse.status}`);
            }

            const classData = await getClassIDResponse.json();
            const classInfo = classData.data.find(c => c.classname === className && c.username === 'S005');
            if (!classInfo) {
                throw new Error(`Class with name ${className} not found for teacher S005`);
            }
            const classID = classInfo.classId;
            console.log(classID);
            
            for (const studentId of studentsInClass) {
                const intStudentId = parseInt(studentId);
                if (isNaN(intStudentId)) {
                    throw new Error(`Invalid student ID: ${studentId}`);
                }

                const addToClassResponese = await fetch(`http://localhost:8090/classroom/addToClassroom?classId=${classID}&studentId=${intStudentId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 设置请求头部
                        'Authorization': sessionStorage.getItem("tokenStr")
                    },
                });

                if (!addToClassResponese.ok) {
                    throw new Error(`HTTP error! status: ${addToClassResponese.status}`);
                }
            }

            handleClose();
        } catch (error) {
            console.error(`Could not create class. Error: ${error}`);
            setError(`Could not create class. Error: ${error}`);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={className} 
                            onChange={(e) => setClassName(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Student ID</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={studentIdInput} 
                                onChange={(e) => setStudentIdInput(e.target.value)} 
                            />
                        <Button style={{ marginTop: '10px' }} onClick={() => handleAddStudent(studentIdInput)}>Add Student</Button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Form.Group>
                </Form>
                <div style={{ maxHeight: '150px', overflowY: 'scroll', marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h5>Students in this class:</h5>
                    {studentsInClass.map(studentId => (
                        <div key={studentId}>{studentId}</div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Create Class</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateClassModal;