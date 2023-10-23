import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
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
import Login from './containers/Login';
import Register from './containers/Register';

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
          <Route path="/CreateAssignment" element={<CreateAssignment />} />
          <Route path="/Grading" element={<Grading />} />
          <Route path="/ClassManagement" element={<ClassManagement />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
