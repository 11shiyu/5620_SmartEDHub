import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function EditStudentsModal({ show, handleClose, handleAdd, handleRemove, currentClass, error, setError }) {
    const [studentIdInput, setStudentIdInput] = useState('');
    const [studentIds, setStudentIds] = useState([]);

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
        if(!show) {
            setStudentIdInput(''); // 清空输入内容
            setError(null); // 清空错误消息
        }
    }, [show]);

    useEffect(() => {
        if(currentClass) {
            fetchClassStudents(currentClass.classID);
        }
    }, [currentClass]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Students</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={studentIdInput} 
                            onChange={(e) => setStudentIdInput(e.target.value)} 
                        />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
                <div style={{ maxHeight: '150px', overflowY: 'scroll', marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h5>Students in this class:</h5>
                    {studentIds.map(id => (
                        <div key={id} style={{cursor: 'pointer'}} onClick={() => setStudentIdInput(id.toString())}>
                            {id}
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleAdd(studentIdInput)}>Add Student</Button>
                <Button variant="danger" onClick={() => handleRemove(studentIdInput)}>Remove Student</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStudentsModal;