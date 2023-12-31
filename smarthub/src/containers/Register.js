import React, { Component } from 'react';
import Notification from '../components/Notification';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '',
      username: '',
      password: '',
      email: '',
      mobile: '',
      gender: 'male', // 默认性别选择
      role: 'student', // 默认角色选择
      notificationMessage: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleNotification = (message) => {
    this.setState({ notificationMessage: message });
    console.log("11");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.role === "student"){
      fetch('http://localhost:8090/studentRegister', {
        method: 'POST', // 指定请求方法为POST
        headers: {
          'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify({
          "realName": this.state.realName,
          "username": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "mobile": this.state.mobile,
          "gender": this.state.gender, // 默认性别选择
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); 
         if(data.code ===500){
          this.handleNotification('Please change a username!');
         }
         
        })
        .catch(error => {
          console.error('请求失败', error);
          console.log(error);
            
          
        });
    }else{
      fetch('http://localhost:8090/teacherRegister', {
        method: 'POST', // 指定请求方法为POST
        headers: {
          'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify({
          "realName": this.state.realName,
          "username": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "mobile": this.state.mobile,
          "gender": this.state.gender, // 默认性别选择
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); 
          if(data.code ===500){
            this.handleNotification('Please change a username!');
           }
          // const history = useHistory();
          // history.push('/Home');
        })
        .catch(error => {
          console.error('请求失败', error);
          if(error.code == 500){
            this.handleNotification('Please change a username!');
          }
        });
        
    }

    

  
    this.setState({
      realName: '',
      username: '',
      password: '',
      email: '',
      mobile: '',
    });
  }

  render() {
    return (
      
      <div>
        <h2 style={{marginTop:'130px'}}>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='formCont' style={{marginTop:"20px"}}>
            <label>Real Name:</label>
            <input
              type="text"
              name="realName"
              value={this.state.realName}
              onChange={this.handleInputChange}
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              style={{marginLeft:"5px"}}
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              style={{marginLeft:"10px"}}
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              style={{marginLeft:"40px"}}
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleInputChange}
              style={{marginLeft:"28px"}}
            />
          </div>
          <div style={{marginTop:"20px"}}>
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.gender === 'male'}
              onChange={this.handleInputChange}
              style={{marginLeft:"28px"}}
            />
            <span>Male</span>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={this.state.gender === 'female'}
              onChange={this.handleInputChange}
              style={{marginLeft:"28px"}}
            />
            <span>Female</span>
          </div>
          <div style={{marginTop:"20px"}}>
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
          </div>
          <button type="submit" style={{marginTop:"20px"}}>Register</button>
        </form>
        <div>
        {/* ...其他内容... */}
        {this.state.notificationMessage && (
          <Notification
            message={this.state.notificationMessage}
            onClose={() => this.setState({ notificationMessage: null })}
          />
        )}
      </div>
      </div>
    );
  }
}

export default Register;
