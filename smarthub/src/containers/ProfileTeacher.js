import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import teacherImage from '../assets/teacher.png';

function ProfileTeacher({ teacherData }) {

  const navigate = useNavigate();

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
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default ProfileTeacher;