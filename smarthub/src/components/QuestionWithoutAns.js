import React, { useState, useEffect } from 'react';
import { Modal, Button} from 'react-bootstrap';

function QuestionWithoutAns({show, handleClose, questionTitle, questionDetail}) {
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 style={{color: '#feae3a'}}><strong>{questionTitle}</strong></h4>
                <p style={{marginTop: '30px'}}>{questionDetail}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default QuestionWithoutAns;