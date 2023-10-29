import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AnswerContentModal from './AnswerContentModal';
import markedImage from '../assets/correct.png';

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
                    <Card.Body style={{ position: 'relative' }}>
                        <div>
                            <Card.Title>{answerItem.classname}</Card.Title>
                            <Card.Text>
                                <strong>Question ID: </strong>{answerItem.questionId} <br/>
                                <strong>Student ID: </strong>{answerItem.studentId} <br/>
                                <strong>Mark: </strong> {answerItem.questionMark}
                            </Card.Text>
                            <Button variant='primary' onClick={() => handleEdit(answerItem)}>Mark</Button>
                        </div>
                        {answerItem.questionMark && (
                            <img src={markedImage} alt="Marked" style={{ position: 'absolute', top: 0, right: 0, width: '50px', height: '50px'}}/>
                        )}
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