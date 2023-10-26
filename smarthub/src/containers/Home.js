import React from 'react';

const questions = {
  question1: 'What is React?',
  question2: 'How does React work?',
  question3: 'Why use React for UI development?',
  // 添加更多的问题...
};

function Home() {
  const cardContainer = {
    position: "relative",
    marginTop: "20px",
    display: 'flex',
    flexDirection: 'column', // 水平布局
    justifyContent: 'space-between', // 在容器内均匀分布卡片
    alignItems: 'center', 
  }
  const card = {
    position: "relative",
    marginTop : "20px",
    width: "800px",
    height: "160px"
  }
  const index = {
    position: "relative",
    textAlign: "left",
    height: "50px",
    width: "100%",
    lineHeight: "50px",
    marginLeft: "15px",
    fontSize: "20px"
  }
  const content = {
    position: "relative",
    textAlign: "left",
    width: "100%",
    marginLeft: "15px",
  }
  return (
    <div className="home-page">
      
      <div className="card-container" style={cardContainer}>
        {Object.keys(questions).map((questionKey) => (
          <div key={questionKey} className="card" style={card}>
            <div style={index}>{questionKey}</div>
            <div style={content}>{questions[questionKey]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;