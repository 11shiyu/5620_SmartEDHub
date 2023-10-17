import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';

import Home from './containers/Home';
import Message from './containers/Message';
import AIPractice from './containers/AIPractice';
import ProfileStudent from './containers/ProfileStudent';
import ProfileTeacher from './containers/ProfileTeacher';
import Favourite from './containers/Favourite';
import CorrectionBook from './containers/CorrectionBook';

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
          <Route path="/Favourite" element={<Favourite />} />
          <Route path="/CorrectionBook" element={<CorrectionBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;