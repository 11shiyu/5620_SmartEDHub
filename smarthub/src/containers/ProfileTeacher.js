import React, {useEffect} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import teacherImage from '../assets/teacher.png';

function ProfileTeacher({ teacherData }) {

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch('http://localhost:8090/getCurrentTeacherDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem("tokenStr")
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Teacher Info:', data);
  
        sessionStorage.setItem('teacherInfo', JSON.stringify(data));
  
      } catch (error) {
        console.error('Failed to fetch teacher details:', error);
      }
  };
  
    fetchTeacherDetails();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Col>
          <Row>
            {/* Card for teacher image */}
            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Card style={{ width: '20rem', marginLeft: '80px' }}>
                  <Card.Img variant="top" src={teacherImage} />
                  <Card.Body>
                    <Card.Title>teacher name</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Col for teacher information */}
            <Col md={1}>
              <div>
                <h5>id</h5>
                <p>teacher ID</p>
                <h5>name</h5>
                <p>teacher name</p>
                <h5>email</h5>
                <p>teachername@uni.sydney.edu.au</p>
                {/* 更多的老师信息 */}
              </div>
            </Col>
          </Row>

          <Row>
            <Button variant="danger" onClick={() => navigate('/CreateAssignment')}>
              Create Assignment
            </Button>
            <Button variant="danger" onClick={() => navigate('/Grading')} style={{ marginTop: '10px' }}>
              Grading Assignment
            </Button>
            <Button variant="danger" onClick={() => navigate('/ClassManagement')} style={{ marginTop: '10px' }}>
              Class Management
            </Button>
            <Button variant="danger" onClick={() => navigate('/Announcement')} style={{ marginTop: '10px' }}>
              Create Announcement
            </Button>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default ProfileTeacher;