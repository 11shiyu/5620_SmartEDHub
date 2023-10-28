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
    { announcementId: 1, announcementTitle: 'announcement 1', announcementDetail: 'Detail for announcement 1' },
    { announcementId: 2, announcementTitle: 'announcement 2', announcementDetail: 'Detail for announcement 2' },
    { announcementId: 3, announcementTitle: 'announcement 3', announcementDetail: 'Detail for announcement 3' },
    { announcementId: 4, announcementTitle: 'announcement 4', announcementDetail: 'Detail for Question 4' },
  ]);

  const [questions, setQuestions] = useState([
    // 示例数据，你可以从API获取真实数据
    { questionId: 1, questionTitle: 'Question 1', questionDetail: 'Detail for Question 1' },
    { questionId: 2, questionTitle: 'Question 2', questionDetail: 'Detail for Question 2' },
    { questionId: 3, questionTitle: 'Question 3', questionDetail: 'Detail for Question 3' },
    { questionId: 4, questionTitle: 'Question 4', questionDetail: 'Detail for Question 4' },
    
  ]);

  const studentId = JSON.parse(sessionStorage.getItem('studentInfo')).studentId
  //const classId = JSON.parse(sessionStorage.getItem('studentInfo')).classId
  const announcementTitle = "";
  //console.log('student id is :', studentId)
  //console.log('student info is :', JSON.parse(sessionStorage.getItem('studentInfo')))
  const questionAPI = `http://localhost:8090/question/studentGetQuestion?studentId=${studentId}`;
  const announcemenntAPI = `http://localhost:8090/announcement/showAnnouncementByStudentId?studentId=${studentId}&announcementTitle=${announcementTitle}`;
  const allAnnouncemenntAPI = `http://localhost:8090/announcement/showAllOrSpecificAnnouncement`;
  useEffect(() => {
      // 假设fetchQuestions是一个异步方法，从数据库获取问题列表
      async function fetchQuestions() {
        try {
            const response = await fetch(questionAPI, {
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
            console.log("questionData", data.data);
            setQuestions(data.data); // 假设您想要将返回的数据保存到test状态中
        } catch (error) {
            console.error('获取学生题目失败:', error);
        }
    }

    async function fetchAnnouncements() {
      try {
          const response = await fetch(announcemenntAPI, {
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
          console.log("announcementData", data);
          setAnnouncements(data.data); // 假设您想要将返回的数据保存到test状态中
      } catch (error) {
          console.error('获取学生公告失败:', error);
      }
  }

      fetchQuestions();
      fetchAnnouncements();
  }, []);

  return (
    <div style={{marginTop: '1vw'}}>
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
          <Col md={{span: 6, offset: 1}}>
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