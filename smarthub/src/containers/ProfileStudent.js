import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student.png';

function ProfileStudent({ studentData }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        

        <Col>
          <Row>
            <Card style={{ width: '18rem', marginRight: '20px' }}>
              <Card.Img variant="top" src={studentImage} />
              <Card.Body>
                <Card.Title>student name</Card.Title>
              </Card.Body>
            </Card>
            <div>
              <h5>id</h5>
              <p>student ID</p>
              <h5>name</h5>
              <p>student name</p>
              {/* 更多的学生信息 */}
            </div>
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