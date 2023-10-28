import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QuestionList from '../components/QuestionList';
import '../css/Styles.css';
import { useNavigate } from 'react-router-dom'; 

function CorrectionBook() {

    const navigate = useNavigate();  // 获取history对象

  const [currentTab, setCurrentTab] = useState('CorrectionBook'); // 用来判断切换当前标签


  const [questions, setQuestions] = useState([
    // 示例数据，你可以从API获取真实数据
    { question_id: 1, question_title: 'Question 1', question_detail: 'Detail for Question 1' },
    { question_id: 2, question_title: 'Question 2', question_detail: 'Detail for Question 2' },
    { question_id: 3, question_title: 'Question 3', question_detail: 'Detail for Question 3' },
    { question_id: 4, question_title: 'Question 4', question_detail: 'Detail for Question 4' },
    
  ]);

  const username = JSON.parse(sessionStorage.getItem('studentInfo')).username;
  console.log('student name is :', username)
  const correctionBookAPI = `http://localhost:8090/correction-notebook/listCorrectionNote?username=${username}`;
  useEffect(() => {
      // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
      async function fetchCorrectionBook() {
        try {
            const response = await fetch(correctionBookAPI, {
                method: 'GET', // 设置请求方法为POST
                headers: {
                    'Content-Type': 'application/json', // 设置请求头
                    'Authorization': window.sessionStorage.getItem('tokenStr')
                },
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("coorrectionBookData", data.data);

            const allQuestionDetails = [];
            await Promise.all(data.data.map(async (question) => {
              //console.log("questionID:", question.questionId);
              const questionDetail = await fetchQuestionDetail(question.questionId);
              allQuestionDetails.push(questionDetail);  // 将每个新的题目详情添加到数组中
            }));

            setQuestions(allQuestionDetails); // 假设您想要将返回的数据保存到test状态中
        } catch (error) {
            console.error('获取学生favourite失败:', error);
        }
    }


    async function fetchQuestionDetail(questionId) {
      const response = await fetch(`http://localhost:8090/question/getQuestionById?questionId=${questionId}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('tokenStr')
          },
      });
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return {
          questionId: data.data.questionId,
          questionTitle: data.data.questionTitle,
          questionDetail: data.data.questionDetail,
          // ...其他你需要的字段
      };
  }


    fetchCorrectionBook();
  }, []);

  const handleBackClick = () => {
    navigate('/ProfileStudent');  // 导航到StudentProfile页面
  };

  return (
    <div>
      <Container fluid>
          {/* 右侧区域 */}
          <Row>
            <Col md={2} className="border-right">
                    <div className="py-3">
                    {/* 添加Back按钮，当点击时触发handleBackClick方法 */}
                    <Button variant="primary" onClick={handleBackClick}>Back</Button>
                    </div>
                </Col>
                <Col md={9}>
                    <div className="py-3">
                    <h3>{currentTab} List</h3>

                        <QuestionList 
                        questions={questions} 
                        setQuestions={setQuestions}
                        currentTab={currentTab} />

                    </div>
                </Col>
          </Row>

      </Container>
    </div>
  );
  }

export default CorrectionBook;