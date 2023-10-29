import React, { Component } from 'react';
import '../css/AIPractice.css'
import '../css/Styles.css';

class AIPractice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'translation',
      textInput: '',
      languageInput: '',
      placeholderText: 'Please input the sentence or essay',
      AI: '',
      MCQ: {questionTitle: "Thank you",questionDetail: "Let's begin"},
      isArtSelected: false,
      imageURL: '../assets/1.jpg', 
      isLoading: false,
    };
  }

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    let placeholderText = '';
    let AI = '';

    if (selectedOption === 'translation') {
      placeholderText = 'Please input the sentence or essay';
    } else if (selectedOption === 'grammar') {
      placeholderText = 'Please input the sentence or essay';
    } else if (selectedOption === 'question') {
      placeholderText = 'Please input the requirements of the question';
    }else if(selectedOption === 'art'){
      placeholderText = 'Please input the requirements of the art';
      this.setState({
        
        isArtSelected: true,
        selectedOption,
        placeholderText,
      });
    }
    if (selectedOption !== 'art') {
      AI = 'Thanks for your using!';
    }

    this.setState({
      selectedOption,
      placeholderText,
      AI,
    });
  };

  handleTextInputChange = (event) => {
    this.setState({ textInput: event.target.value });
  };

  handleLanguageInputChange = (event) => {
    this.setState({ languageInput: event.target.value });
  };

  submit  = async (e) =>{
    if(this.state.selectedOption === 'translation'){
      try {
        const response = await fetch(`http://localhost:8090/translation?targetLanguage=${this.state.languageInput}&text=${this.state.textInput}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
        });
        this.setState({ isLoading: true });
        const data = await response.json();
        console.log( data);
        this.setState({ AI: data.msg });
        } catch (error) {
            console.error(`Could not submit form. Error: ${error}`);
        } finally {
          this.setState({ isLoading: false });
        }
      
    }else if(this.state.selectedOption === 'grammar'){
      try {
        const response = await fetch(`http://localhost:8090/reviseAnEssay?text=${this.state.textInput}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
        });
        this.setState({ isLoading: true });
        const data = await response.json();
        console.log( data);
        this.setState({ AI: data.msg });
        } catch (error) {
            console.error(`Could not submit form. Error: ${error}`);
        } finally {
          this.setState({ isLoading: false });
        }
    }else if(this.state.selectedOption === 'art'){
      try {
        const response = await fetch(`http://localhost:8090/generateImagesByGPT?text=${this.state.textInput}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
        });
        this.setState({ isLoading: true });
        const data = await response.json();
        console.log(data[0]);
        this.setState({imageURL: data[0]})
        // this.setState({ AI: data.msg });
        } catch (error) {
            console.error(`Could not submit form. Error: ${error}`);
        } finally {
          this.setState({ isLoading: false });
        }
    }else{
      try {
        const response = await fetch(`http://localhost:8090/generateMCQ?text=${this.state.textInput}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 设置请求头部
                'Authorization': sessionStorage.getItem("tokenStr")
            },
        });
        this.setState({ isLoading: true });
        const data = await response.json();
        console.log(data.data);
        this.setState({ MCQ: data.data });
        } catch (error) {
            console.error(`Could not submit form. Error: ${error}`);
        } finally {
          this.setState({ isLoading: false });
        }
    }
  };

  render() {

    return (
      <div className="AIPractice">
        <div className="radioOptions">
          <label>
            <input
              type="radio"
              value="translation"
              checked={this.state.selectedOption === 'translation'}
              onChange={this.handleOptionChange}
              style={{marginRight:"20px"}}
            />
            Translation
          </label>
          <label>
            <input
              type="radio"
              value="grammar"
              checked={this.state.selectedOption === 'grammar'}
              onChange={this.handleOptionChange}
              style={{marginRight:"20px",marginLeft:"30px"}}
            />
            Fix Grammer
          </label>
          <label>
            <input
              type="radio"
              value="question"
              checked={this.state.selectedOption === 'question'}
              onChange={this.handleOptionChange}
              style={{marginRight:"20px",marginLeft:"30px"}}
            />
            MCQ
          </label>
          <label>
            <input
              type="radio"
              value="art"
              checked={this.state.selectedOption === 'art'}
              onChange={this.handleOptionChange}
              style={{marginRight:"20px",marginLeft:"30px"}}
            />
            Art
          </label>
        </div>

        
        <div className={this.state.isArtSelected ? 'artLayout' : 'AI'}>
        {this.state.selectedOption === 'question' && this.state.MCQ && (
          <>
            <p>{this.state.MCQ.questionTitle}</p>
            <p>{this.state.MCQ.questionDetail}</p>
          </>
        )}
        {this.state.selectedOption != 'question' && this.state.AI && (
          <>
            <p>{this.state.AI}</p>
            
          </>
        )}
        {this.state.selectedOption === 'art' && (
          <>
            <img src={this.state.imageURL} alt="" 
            className='image'/>
            
          </>
        )}
        </div>
        

        <textarea
          value={this.state.textInput}
          onChange={this.handleTextInputChange}
          placeholder={this.state.placeholderText}
          rows="10"
          cols="60"
          className={this.state.isArtSelected ? 'artTextArea' : 'textInput'}
        ></textarea>
      
      <div className="languageInput">
        {this.state.selectedOption === 'translation' && (
          <label>Target language: 
          <input
            type="text"
            value={this.state.languageInput}
            onChange={this.handleLanguageInputChange}
            placeholder="Input language"
            
          /></label>
        )}
      </div>
        
      <div className='submitCont' onClick={this.submit}>
        <div 
        
        className={this.state.isArtSelected ? 'artSubmit' : 'submit'}
        >Submit</div>

      </div>
          {this.state.isLoading && (
            <div className="overlay">
              <div className="loader"></div>
            </div>
          )}
        
      </div>
    );
  }
}

export default AIPractice;
