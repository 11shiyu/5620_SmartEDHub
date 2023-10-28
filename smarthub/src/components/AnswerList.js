import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import EditStudentsModal from './EditStudentsModal';

function AnswerList({ansListData, setAnsListData}) {


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
        </div>
    );
}

export default AnswerList;