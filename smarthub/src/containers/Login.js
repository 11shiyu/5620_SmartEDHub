import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
//import axios from '../axiosConfig'; 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isVisible: false,
    };
  }

  showNotification = (message) => {
    this.setState({ message, isVisible: true });
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
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
          // const history = useHistory();
          // history.push('/Home');
        })
        .catch(error => {
          console.error('请求失败', error);
        });

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
            // const history = useHistory();
            // history.push('/Home');
          })
          .catch(error => {
            console.error('获取学生信息请求失败', error);
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
        <div>
            {this.state.isVisible && (
            <div className="notification-box" style={notice}>
                {this.state.message}
                <button onClick={this.hideNotification} style={{position: 'absolute', bottom: '5px'}}>close</button>
            </div>
            )}
        </div>
    </div>
    );
  }
}

export default Login;
