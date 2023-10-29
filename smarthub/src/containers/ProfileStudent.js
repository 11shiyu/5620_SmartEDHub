import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student.png';

function ProfileStudent({ studentData }) {

  const navigate = useNavigate();
  const studentUsername = JSON.parse(sessionStorage.getItem('studentInfo')).username;
  const studentId = JSON.parse(sessionStorage.getItem('studentInfo')).studentId;
  const studentEmail = JSON.parse(sessionStorage.getItem('studentInfo')).email;

  const studentInfo = JSON.parse(sessionStorage.getItem('studentInfo'));
  const [imageURL, setImageURL] = useState(studentInfo?.avatar || studentImage);
  
  useEffect(() => {
    if (studentInfo?.avatar) {
      setImageURL(studentInfo.avatar);
    }
  }, [studentInfo]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', file);

    try {
      const response = await fetch('http://localhost:8090/student/updateAvatar', {
        method: 'POST',
        headers: {
          'Authorization': window.sessionStorage.getItem('tokenStr')
        },
        body: formData,
      });

      const data = await response.json();

      if (data.data) {
        setImageURL(data.data);
        console.log("image before set:", studentInfo.avatar);
        sessionStorage.setItem('studentInfo', JSON.stringify({ ...studentInfo, avatar: data.data }));
        console.log("image after url:", studentInfo.avatar);
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Col>
          <Row>
            {/* Card for student image */}
            <Col md={5}>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Card style={{ width: '20rem', marginLeft: '80px' }}>
                  <Card.Img variant="top" src={imageURL} />
                  <Card.Body>
                    <Card.Title>{studentUsername}</Card.Title>
                    <input type="file" onChange={handleImageUpload} />
                  </Card.Body>
                </Card>
              </div>
            </Col>

            {/* Col for student information */}
            <Col md={1}>
              <div>
                <h5><strong>ID:{studentId}</strong></h5>
                <p></p>
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