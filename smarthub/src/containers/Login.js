import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigateContext from '../components/NavigateContext';

class Login extends Component {
  static contextType = NavigateContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isVisible: false,
      role: 'student',
    };
  }
  
  showNotification = (message) => {
    this.setState({ message, isVisible: true });
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }
  
  handleInputChange = (e) => {
      console.log(e.target.value);
      this.setState({ role: e.target.value });
     }
    
  hideNotification = () => {
    this.setState({ isVisible: false });
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = () => {

    
    const { username, password } = this.state;
    if (username === '' || password === '') {
        this.showNotification('Please input all the information!')
    } else {
      fetch('http://localhost:8090/login', {
        method: 'POST', // 指定请求方法为POST
        headers: {
          'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify({
         "username": username,
          "password": password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); 
          sessionStorage.setItem("tokenStr", data.data.tokenHead+data.data.token);
          if(this.state.role==='student'){
            sessionStorage.setItem("role",1);
            // get current student detail and storage them into session
            fetch('http://localhost:8090/getCurrentStudentDetails', {
              method: 'POST', // 指定请求方法为POST
              headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': window.sessionStorage.getItem('tokenStr')
              },
            
            })
            .then(response => response.json())
            .then(data => {
              console.log('studentInfo:', data); 
              sessionStorage.setItem("studentInfo", JSON.stringify(data));
              // const navigate = useNavigate();
              // navigate('/Home');
              this.context('/Home');
            })
            .catch(error => {
              console.error('获取学生信息请求失败', error);
            });
          }else if(this.state.role==='teacher'){
            sessionStorage.setItem("role",2);
            fetch('http://localhost:8090/getCurrentTeacherDetails', {
              method: 'POST', // 指定请求方法为POST
              headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': window.sessionStorage.getItem('tokenStr')
              },
            
            })
            .then(response => response.json())
            .then(data => {
              console.log('teacherInfo:', data); 
              sessionStorage.setItem("teacherInfo", JSON.stringify(data));
              this.context('/Home');
            })
            .catch(error => {
              console.error('获取老师信息请求失败', error);
            });
          }else{
            sessionStorage.setItem("role",3);
            this.context('/Home');
          }
          }).catch(error => {
            console.error('请求失败', error);
          });
    }
  }

  render() {
    const loginCont = {
      height: '100%',
      width: '100%',
      position: 'relative',
    };
    const usernameCont = {
        position: 'relative',
        height: '80px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    };
    const passwordCont = {
        position: 'relative',
        height: '80px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    const notice = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '2px solid black',
        display: 'flex',
        backgroundColor :'white',
        alignItems: 'center',
        justifyContent: 'center',
    }


    return (
      <div style={loginCont}>
        <h2 style={{marginTop:"180px"}}>Login</h2>
        <div style={usernameCont}>
          <label style={{marginRight: '20px'}}>Username:</label>
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </div>
        <div style={passwordCont}>
          <label style={{marginRight: '20px'}}>Password:</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <button onClick={this.handleLogin}>Login</button>
        <div>
          <p>Not have an account? <Link to="/Register">Register</Link></p>
        </div>
        <label>Role:</label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={this.state.role === 'student'}
              onChange={this.handleInputChange}
              style={{marginLeft:"28px"}}
            />
            <span>Student</span>
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={this.state.role === 'teacher'}
              onChange={this.handleInputChange}
              style={{marginLeft:"28px"}}
            />
            <span>Teacher</span>


        <div>
            {this.state.isVisible && (
            <div className="notification-box" style={notice}>
                {this.state.message}
                <button onClick={this.hideNotification} style={{position: 'absolute', bottom: '5px'}}>close</button>
            </div>
            )}
        </div>
        <input
              type="radio"
              name="role"
              value="admin"
              checked={this.state.role === 'admin'}
              onChange={this.handleInputChange}
              style={{right:"3px",bottom:"5px",position:"fixed" }}
            />
            <span style={{bottom:'0',right:"20px",position:"fixed" }}>Admin</span>
    </div>
    );
  }
}

export default Login;
