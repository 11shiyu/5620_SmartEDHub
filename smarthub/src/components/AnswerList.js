import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import AnswerContentModal from './AnswerContentModal';

function AnswerList({ansListData, setAnsListData}) {
    const [showModal, setShowModal] = useState(false);

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
                        <Button variant='primary'>Mark</Button>
                    </Card.Body>
                </Card>
            ))}

            <AnswerContentModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                ansListData={ansListData}
            />
        </div>
    );
}

export default AnswerList;