import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QuestionList from '../components/QuestionList';

function Message() {

  
  const [questions, setQuestions] = useState([
    // 示例数据，你可以从API获取真实数据
    { question_id: 1, question_title: 'Question 1', question_detail: 'Detail for Question 1' },
    { question_id: 2, question_title: 'Question 2', question_detail: 'Detail for Question 2' },
    { question_id: 3, question_title: 'Question 3', question_detail: 'Detail for Question 3' },
    { question_id: 4, question_title: 'Question 4', question_detail: 'Detail for Question 4' },
    // ...其他问题
  ]);

  // useEffect(() => {
  //     // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
  //     async function fetchQuestions() {
  //         const data = await yourAPI.getQuestions(); // 替换为你实际的API调用
  //         setQuestions(data);
  //     }

  //     fetchQuestions();
  // }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          {/* 左侧区域 */}
          <Col md={2} className="border-right">
            <div className="py-3">
              <h5>Announcement</h5>
            </div>
            <div className="py-3">
              <h5>Assessment</h5>
            </div>
          </Col>

          {/* 右侧区域 */}
          <Col md={9}>
            <div className="py-3">
              <h3>Announcement List</h3>
              <hr />
              <QuestionList questions={questions} setQuestions={setQuestions} />
              <hr />
              <p>Message 2</p>
              <hr />
              <p>Message 3</p>
              {/* ...更多消息 */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  }

export default Message;