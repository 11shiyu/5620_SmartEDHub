import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function AnnouncementModal({ show, handleClose, classes, title, content }) {

    const [selectedClass, setSelectedClass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8090/announcement/createAnnouncement?classId=${selectedClass}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("tokenStr")
                },
                body: JSON.stringify({announcementDetail: content, announcementTitle: title})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Successful published');
        } catch (error) {
            console.error('Failed to publish the announcement:', error);
        }
        handleClose();
        navigate('/ProfileTeacher');
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Class</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Select the class you want to publish</p>
                <Form>
                    {classes.map((classItem) => (
                        <Form.Check
                            key={classItem.classId}
                            type="radio"
                            label={classItem.classname}
                            name="classGroup"
                            id={classItem.id}
                            onChange={() => setSelectedClass(classItem.classId)}
                        />
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Publish
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AnnouncementModal;