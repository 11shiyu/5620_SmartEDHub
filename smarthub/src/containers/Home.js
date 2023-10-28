import React from 'react';

const questions = {
  Question1: ['Fill in the blank: In a triangle, the sum of the interior angles is __ degrees.', 'Answer: 180'],
  Question2: ['If the square of a positive integer is 64, then the positive integer is __.','Answer: 8'],
  Question3: ['Calculate 5 squared, the answer is __.','Answer: 25'],
  Question4: ['If the length of a rectangle is 10 centimeters, and the width is __ centimeters, its area is 30 square centimeters.','Answer: 3'],
  Question5: ['Calculate 12 divided by 4, the answer is __.','Answer: 3'],
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
  const content2 = {
    position: "absolute",
    textAlign: "right",
    width: "100%",
    right: "15px",
    bottom: "15px"
  }
  return (
    <div className="home-page">
      
      <div className="card-container" style={cardContainer}>
        {Object.keys(questions).map((questionKey) => (
          <div key={questionKey} className="card" style={card}>
            <div style={index}>{questionKey}</div>
            <div style={content}>{questions[questionKey][0]}</div>
            <div style={content2} >{questions[questionKey][1]}</div>
          </div>
        ))}
      </div>

      <div style={{position:"relative",height:"60px"}}></div>
    </div>
  );
}

export default Home;