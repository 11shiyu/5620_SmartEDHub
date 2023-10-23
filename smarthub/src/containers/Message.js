import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import QuestionList from '../components/QuestionList';
import '../css/Styles.css';

function Message() {

  const [currentTab, setCurrentTab] = useState('Announcement'); // 用来判断切换当前标签
  const [activeTab, setActiveTab] = useState('Announcement');  // 新状态变量来追踪激活的标签

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentTab(tab);
  }
  const [announcements, setAnnouncements] = useState([
    // ...你的示例数据
    { announcement_id: 1, announcement_title: 'announcement 1', announcement_detail: 'Detail for announcement 1' },
    { announcement_id: 2, announcement_title: 'announcement 2', announcement_detail: 'Detail for announcement 2' },
    { announcement_id: 3, announcement_title: 'announcement 3', announcement_detail: 'Detail for announcement 3' },
    { announcement_id: 4, announcement_title: 'announcement 4', announcement_detail: 'Detail for Question 4' },
  ]);

  const [questions, setQuestions] = useState([
    // 示例数据，你可以从API获取真实数据
    { question_id: 1, question_title: 'Question 1', question_detail: 'Detail for Question 1' },
    { question_id: 2, question_title: 'Question 2', question_detail: 'Detail for Question 2' },
    { question_id: 3, question_title: 'Question 3', question_detail: 'Detail for Question 3' },
    { question_id: 4, question_title: 'Question 4', question_detail: 'Detail for Question 4' },
    
  ]);

  const yourAPI = "";
  const [test, setTest] = useState([]);
  useEffect(() => {
      // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
      async function fetchQuestions() {
          const response = await fetch(yourAPI); // 替换为你实际的API调用
          const data = await response.json();
          console.log("testData", data);
          setTest(test);
      }

      fetchQuestions();
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          {/* 左侧区域 */}
          <Col md={2} className="border-right">
            <div className="py-3">
              <Button
                variant="outline-primary"
                className={`tab-button ${activeTab === 'Announcement' ? 'active' : ''}`}
                onClick={() => handleTabClick('Announcement')}
                block  // 使按钮具有块级显示，填满容器宽度
              >
                Announcement
              </Button>
            </div>
            <div className="py-3">
              <Button
                variant="outline-primary"
                className={`tab-button ${activeTab === 'Assessment' ? 'active' : ''}`}
                onClick={() => handleTabClick('Assessment')}
                block  // 使按钮具有块级显示，填满容器宽度
              >
                 Assessment 
              </Button>
            </div>
          </Col>

          {/* 右侧区域 */}
          <Col md={9}>
            <div className="py-3">
              <h3>{currentTab} List</h3>

                <QuestionList 
                questions={currentTab === 'Announcement' ? announcements : questions} 
                setQuestions={currentTab === 'Announcement' ? setAnnouncements : setQuestions}
                currentTab={currentTab} />

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  }

export default Message;