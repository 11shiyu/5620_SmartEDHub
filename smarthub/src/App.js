import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
// 假设你已经创建了以下三个组件或页面
import Home from './components/Home';
import Message from './components/Message';
import AIPractice from './components/AIPractice';
import ProfileStudent from './components/ProfileStudent';
import ProfileTeacher from './components/ProfileTeacher';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/AIPractice" element={<AIPractice />} />
          <Route path="/ProfileStudent" element={<ProfileStudent />} />
          <Route path="/ProfileTeacher" element={<ProfileTeacher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;