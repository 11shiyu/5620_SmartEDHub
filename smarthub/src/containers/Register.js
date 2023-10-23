import React, { Component } from 'react';

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
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // 在这里添加注册逻辑，可以将用户输入的数据发送到后端进行注册

    // 清空表单字段
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
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Real Name:</label>
            <input
              type="text"
              name="realName"
              value={this.state.realName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.gender === 'male'}
              onChange={this.handleInputChange}
            />
            <span>Male</span>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={this.state.gender === 'female'}
              onChange={this.handleInputChange}
            />
            <span>Female</span>
          </div>
          <div>
            <label>Role:</label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={this.state.role === 'student'}
              onChange={this.handleInputChange}
            />
            <span>Student</span>
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={this.state.role === 'teacher'}
              onChange={this.handleInputChange}
            />
            <span>Teacher</span>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
