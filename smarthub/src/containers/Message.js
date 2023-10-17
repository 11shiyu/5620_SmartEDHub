import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Message() {
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
              <p>Message 1</p>
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