import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AnswerContentModal from './AnswerContentModal';

function AnswerList({ansListData, setAnsListData}) {
    const [showModal, setShowModal] = useState(false);
    const [currentAns, setCurrentAns] = useState({});

    const handleEdit = (answerItem) => {
        setCurrentAns(answerItem);
        setShowModal(true);
    };

    return (
        <div>
            {ansListData.map((answerItem) => (
                <Card key={answerItem.studentId} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        <Card.Title>{answerItem.classname}</Card.Title>
                        <Card.Text>
                            <strong>Question ID: </strong>{answerItem.questionId} <br/>
                            <strong>Student ID: </strong>{answerItem.studentId} <br/>
                        </Card.Text>
                        <Button variant='primary' onClick={() => handleEdit(answerItem)}>Mark</Button>
                    </Card.Body>
                </Card>
            ))}

            <AnswerContentModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                answerData={currentAns}
            />
        </div>
    );
}

export default AnswerList;