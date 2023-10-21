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
        // 在这里调用API来查询数据库中的学生ID, 通过返回一个布尔值，判断学生是否存在

        //测试
        return false;
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

    const handleSubmit = () => {
        const newClassData = {
            classID: Math.random().toString(36).substr(2, 9), // 生成一个随机ID
            studentID: studentsInClass,
            teacherID: 'T001', // 获取自身的TeacherID
            className: className
        };
    
        handleCreate(newClassData);
        handleClose();
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