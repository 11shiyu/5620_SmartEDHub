import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function SelectClassModal({ show, handleClose, classes }) {
    const [selectedClass, setSelectedClass] = useState('');

    const handleSubmit = () => {
        console.log('Selected class:', selectedClass);
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