import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student.png';

function ProfileStudent({ studentData }) {
  const navigate = useNavigate();
  const studentUsername = JSON.parse(sessionStorage.getItem('studentInfo')).username;
  const studentId = JSON.parse(sessionStorage.getItem('studentInfo')).teacherId;
  const studentEmail = JSON.parse(sessionStorage.getItem('studentInfo')).email;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Col>
          <Row>
            {/* Card for student image */}
            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Card style={{ width: '20rem', marginLeft: '80px' }}>
                  <Card.Img variant="top" src={studentImage} />
                  <Card.Body>
                    <Card.Title>student name</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Col for student information */}
            <Col md={1}>
              <div>
                <h5 style={{textAlign: 'left'}}><strong>ID:</strong></h5>
                <p>{studentId}</p>
                <h5><strong>NAME:</strong></h5>
                <p>{studentUsername}</p>
                <h5><strong>EMAIL:</strong></h5>
                <p>{studentEmail}</p>
                {/* 更多的学生信息 */}
              </div>
            </Col>
          </Row>

          <Row>
            <Button variant="danger" onClick={() => navigate('/Favourite')}>
              Favourite
            </Button>
            <Button variant="danger" onClick={() => navigate('/CorrectionBook')} style={{ marginTop: '10px' }}>
              Correction Book
            </Button>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default ProfileStudent;