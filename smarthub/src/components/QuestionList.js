import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import QuestionWithoutAns from './QuestionWithoutAns';
import QuestionWithAns from './QuestionWithAns';

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
        } else if (currentTab === 'Assessment' || currentTab === 'Favourite' || currentTab === 'CorrectionBook') {
            updatedQuestions = questions.filter(q => q.question_id !== id);
        }
        //const updatedQuestions = questions.filter(q => q.question_id !== id);
        setQuestions(updatedQuestions);
    };

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const handleClose = () => {
        setShowModal(false);
        setError(null); // 清空错误消息
    };

    const [currentTitle, setCurrentTitle] = useState('');  // 新状态，用于保存当前选中的questionTitle
    const [currentDetail, setCurrentDetail] = useState('');  // 新状态，用于保存当前选中的questionDetail
    const [currentId, setCurrentId] = useState(null);
    const username = JSON.parse(sessionStorage.getItem('studentInfo')).username


    const handleClick = (id, title, detail) => {
        setCurrentTitle(title);  // 设置当前选中的questionTitle
        setCurrentDetail(detail);  // 设置当前选中的questionDetail
        setShowModal(true);  // 显示模态框
        setCurrentId(id);
    };

    async function addToFavourites() {
        try {
            const response = await fetch(`http://localhost:8090/my-favourite/addToFavourite?questionId=${currentId}&username=${username}`, {
                method: 'PUT', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("addToFavourites Data", data);
            //setAnnouncements(data.data); // 假设您想要将返回的数据保存到test状态中
        } catch (error) {
            console.error('添加到Favourites失败:', error);
        }
    }

    async function addToFavourites() {
        try {
            const response = await fetch(`http://localhost:8090/my-favourite/addToFavourite?questionId=${currentId}&username=${username}`, {
                method: 'PUT', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("addToFavourites URL", `http://localhost:8090/my-favourite/addToFavourite?questionId=${currentId}&username=${username}`);
            console.log("addToFavourites Data", data);
            //setAnnouncements(data.data); // 假设您想要将返回的数据保存到test状态中
        } catch (error) {
            console.error('addToFavourites 失败:', error);
        }
    }

    async function addToCorrectionBook() {
        try {
            const response = await fetch(`http://localhost:8090/correction-notebook/addToCorrection?questionId=${currentId}&username=${username}`, {
                method: 'PUT', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("addToCorrectionBook URL", `http://localhost:8090/correction-notebook/addToCorrection?questionId=${currentId}&username=${username}`);
            console.log("addToCorrectionBook Data", data);
            //setAnnouncements(data.data); // 假设您想要将返回的数据保存到test状态中
        } catch (error) {
            console.error('addToCorrectionBook 失败:', error);
        }
    }

    // Handles adding to favourites
    const handleAddToFavourites = async (id) => {
        //const username = 'your_username'; // Replace this with the actual username
        setCurrentId(id);
        await addToFavourites();
    };

    // Handles adding to correction book
    const handleAddToCorrectionBook = async (id) => {
        //const username = 'your_username'; // Replace this with the actual username
        setCurrentId(id);
        await addToCorrectionBook();
    };

    return (
        <div>
            {questions.map((question) => {
                // 根据 currentTab 决定要使用的属性
                let idProperty, titleProperty, detailProperty;
                if (currentTab === 'Announcement') {
                    idProperty = 'announcementId';
                    titleProperty = 'announcementTitle';
                    detailProperty = 'announcementDetail';
                } else if (currentTab === 'Assessment' || currentTab === 'Favourite' || currentTab === 'CorrectionBook') {
                    idProperty = 'questionId';
                    titleProperty = 'questionTitle';
                    detailProperty = 'questionDetail';
                }

                return (
                    <div>
                        <Card key={question[idProperty]} style={{ marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title onClick={() => handleClick(question[idProperty], question[titleProperty], question[detailProperty])}>{question[titleProperty]}</Card.Title>
                                <Card.Text>{question[detailProperty]}</Card.Text>
                                {currentTab === 'Assessment' &&
                                <>
                                    <Button variant="primary" onClick={() => handleAddToFavourites(question[idProperty])}>Favourite</Button>
                                    <Button variant="secondary" onClick={() => handleAddToCorrectionBook(question[idProperty])}>Add to Correction Book</Button>
                                </>}

                                <Button variant="danger" onClick={() => handleDelete(question[idProperty])}>delete</Button>
                            </Card.Body>
                        </Card>
                        {currentTab === 'Assessment' ?
                            <QuestionWithAns
                                show={showModal}
                                handleClose={() => setShowModal(false)}
                                questionId={currentId}
                                questionTitle={currentTitle}
                                questionDetail={currentDetail}
                            /> :
                            <QuestionWithoutAns
                                show={showModal}
                                handleClose={() => setShowModal(false)}
                                questionTitle={currentTitle}
                                questionDetail={currentDetail}
                            />}
                    </div>
                );
            })}
        </div>
    );
}


export default QuestionList;