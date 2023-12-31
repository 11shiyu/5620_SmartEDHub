import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useNavigate } from 'react-router-dom';
import NavigateContext from './components/NavigateContext';
import { Navigate } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';

import Home from './containers/Home';
import Message from './containers/Message';
import AIPractice from './containers/AIPractice';
import ProfileStudent from './containers/ProfileStudent';
import ProfileTeacher from './containers/ProfileTeacher';
import Favourite from './containers/Favourite';
import CorrectionBook from './containers/CorrectionBook';
import CreateAssignment from './containers/CreateAssignment';
import Grading from './containers/Grading';
import ClassManagement from './containers/ClassManagement';
import Register from './containers/Register';
import Login from './containers/Login';
import GenerateAssign from './containers/GenerateAssign';
import Announcement from './containers/Announcement';
import AdminPanel from './containers/AdminPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/AIPractice" element={<AIPractice />} />
          <Route path="/ProfileStudent" element={<ProfileStudent />} />
          <Route path="/ProfileTeacher" element={<ProfileTeacher />} />
          <Route path="/Favourite" element={<Favourite />} />
          <Route path="/CorrectionBook" element={<CorrectionBook />} />
          <Route path="/CreateAssignment" element={<CreateAssignment />} />
          <Route path="/Grading" element={<Grading />} />
          <Route path="/ClassManagement" element={<ClassManagement />} />
          <Route path="/Login" element={<LoginWithNavigate />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/GenerateAssign" element={<GenerateAssign />} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

function LoginWithNavigate() {
  const navigate = useNavigate();
  return (
    <NavigateContext.Provider value={navigate}>
      <Login />
    </NavigateContext.Provider>
  );
}

export default App;