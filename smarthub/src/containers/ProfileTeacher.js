import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import teacherImage from '../assets/teacher.png';

function ProfileTeacher({ teacherData }) {

  const navigate = useNavigate();
  const teacherUsername = JSON.parse(sessionStorage.getItem('teacherInfo')).username;
  const teacherId = JSON.parse(sessionStorage.getItem('teacherInfo')).teacherId;
  const teacherEmail = JSON.parse(sessionStorage.getItem('teacherInfo')).email;

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
                    <Card.Title>{teacherUsername}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Col for teacher information */}
            <Col md={1}>
              <div>
                <h5 style={{textAlign: 'left'}}><strong>ID:</strong></h5>
                <p>{teacherId}</p>
                <h5><strong>NAME:</strong></h5>
                <p>{teacherUsername}</p>
                <h5><strong>EMAIL:</strong></h5>
                <p>{teacherEmail}</p>
                {/* 更多的老师信息 */}
              </div>
            </Col>
          </Row>

          <Row style={{marginTop: '40px'}}>
            <Button variant="info" onClick={() => navigate('/CreateAssignment')}>
              Create Assignment
            </Button>
            <Button variant="info" onClick={() => navigate('/Grading')} style={{ marginTop: '15px' }}>
              Grading Assignment
            </Button>
            <Button variant="info" onClick={() => navigate('/Announcement')} style={{ marginTop: '15px' }}>
              Create Announcement
            </Button>
            <Button variant="info" onClick={() => navigate('/ClassManagement')} style={{ marginTop: '15px' }}>
              Class Management
            </Button>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default ProfileTeacher;