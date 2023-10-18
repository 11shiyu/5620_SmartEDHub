import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QuestionList from '../components/QuestionList';
import '../css/Styles.css';
import { useNavigate } from 'react-router-dom'; 

function Favourite() {

    const navigate = useNavigate();  // 获取history对象

    const [currentTab, setCurrentTab] = useState('Favourite'); // 用来判断切换当前标签


  const [question, setQuestions] = useState([
    // 示例数据，你可以从API获取真实数据
    { question_id: 1, question_title: 'Question 1', question_detail: 'Detail for Question 1' },
    { question_id: 2, question_title: 'Question 2', question_detail: 'Detail for Question 2' },
    { question_id: 3, question_title: 'Question 3', question_detail: 'Detail for Question 3' },
    { question_id: 4, question_title: 'Question 4', question_detail: 'Detail for Question 4' },
    { question_id: 3, question_title: 'Question 3', question_detail: 'Detail for Question 3' },
    { question_id: 4, question_title: 'Question 4', question_detail: 'Detail for Question 4' },
    
  ]);

  // useEffect(() => {
  //     // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
  //     async function fetchQuestions() {
  //         const data = await yourAPI.getQuestions(); // 替换为你实际的API调用
  //         setQuestions(data);
  //     }

  //     fetchQuestions();
  // }, []);

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
                        questions={question} 
                        setQuestions={setQuestions}
                        currentTab={currentTab} />

                    </div>
                </Col>
          </Row>

      </Container>
    </div>
  );
  }
export default Favourite;