import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


function EditStudentsModal({ show, handleClose, handleAdd, handleRemove, currentClass, error, setError }) {
    const [studentIdInput, setStudentIdInput] = useState('');

    useEffect(() => {
        if(!show) {
            setStudentIdInput(''); // 清空输入内容
            setError(null); // 清空错误消息
        }
    }, [show]);

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
                {/* <div style={{ maxHeight: '150px', overflowY: 'scroll', marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
                    <h5>Students in this class:</h5>
                    {currentClass && currentClass.studentID.map(id => (
                        <div key={id}>{id}</div>
                    ))}
                </div> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => handleAdd(studentIdInput)}>Add Student</Button>
                <Button variant="danger" onClick={() => handleRemove(studentIdInput)}>Remove Student</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStudentsModal;