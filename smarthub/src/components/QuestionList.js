import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

// 假设的API方法，用于从数据库删除特定ID的题目
const deleteQuestionFromDB = async (id) => {
  // 在这里你可以调用API来从数据库删除题目
  console.log(`Deleted question with ID: ${id}`);
};

function QuestionList({ questions, setQuestions, currentTab }) { // 通过结构赋值来接受questions prop

    const handleDelete = async (id) => {
        // 删除数据库中的数据
        await deleteQuestionFromDB(id);
    
        //更新状态，移除已删除的问题
        //console.log("currentTab:", currentTab);
        //console.log("currentQuestion:", questions);
        let updatedQuestions = [];
        if (currentTab === 'Announcement') {
            updatedQuestions = questions.filter(q => q.announcement_id !== id);
        } else if (currentTab === 'Assessment') {
            updatedQuestions = questions.filter(q => q.question_id !== id);
        }
        //const updatedQuestions = questions.filter(q => q.question_id !== id);
        setQuestions(updatedQuestions);
      };


    return (
        <div>
            {questions.map((question) => {
                // 根据 currentTab 决定要使用的属性
                let idProperty, titleProperty, detailProperty;
                if (currentTab === 'Announcement') {
                    idProperty = 'announcement_id';
                    titleProperty = 'announcement_title';
                    detailProperty = 'announcement_detail';
                } else if (currentTab === 'Assessment') {
                    idProperty = 'question_id';
                    titleProperty = 'question_title';
                    detailProperty = 'question_detail';
                }

                return (
                    <Card key={question[idProperty]} style={{ marginBottom: '20px' }}>
                        <Card.Body>
                            <Card.Title>{question[titleProperty]}</Card.Title>
                            <Card.Text>{question[detailProperty]}</Card.Text>
                            <Button variant="danger" onClick={() => handleDelete(question[idProperty])}>delete</Button>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}


export default QuestionList;