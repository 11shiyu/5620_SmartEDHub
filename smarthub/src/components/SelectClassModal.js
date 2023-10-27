import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function SelectClassModal({ show, handleClose, classes, questionId }) {
    const [selectedClass, setSelectedClass] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8090/question/allocateQuestion?classId=${selectedClass}&questionId=${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Successful distribution');
        } catch (error) {
            console.error('Failed to distribute question:', error);
        }
        handleClose();
    };

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Select the class you want to publish</p>
                <Form>
                    {classes.map((classItem) => (
                        <Form.Check
                            key={classItem.id}
                            type="radio"
                            label={classItem.name}
                            name="classGroup"
                            id={classItem.id}
                            onChange={() => setSelectedClass(classItem.id)}
                        />
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SelectClassModal;