import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

// 假设的API方法，用于从数据库删除特定ID的题目
const deleteQuestionFromDB = async (id) => {
  // 在这里你可以调用API来从数据库删除题目
  console.log(`Deleted question with ID: ${id}`);
};

function QuestionList({ questions, setQuestions }) { // 通过结构赋值来接受questions prop

    const handleDelete = async (id) => {
        // 删除数据库中的数据
        await deleteQuestionFromDB(id);
    
        //更新状态，移除已删除的问题
        const updatedQuestions = questions.filter(q => q.question_id !== id);
        setQuestions(updatedQuestions);
      };


    return (
        <div>
            {questions.map((question) => (
                <Card key={question.question_id} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        <Card.Title>{question.question_title}</Card.Title>
                        <Card.Text>{question.question_detail}</Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(question.question_id)}>delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}


export default QuestionList;