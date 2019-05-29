import React, { Component } from 'react';

const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp(''+cookieName+'[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,'') : '');
}

class App extends Component {
  constructor(props){
    super(props);
  
  this.state = {
    clickCount: getCookie('count') || 0,
    usernameIsEditable: false,
    username: getCookie('username') || '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleClick = () => {
    const newCount = Number(this.state.clickCount) + 1;
    document.cookie = `count=${newCount}`;
    this.setState({
      clickCount: newCount,
    });
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleSave = () => {
    const newUser = String(this.state.inputText);
    document.cookie = `username =${newUser}`;
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  render() {
    const view = this.state.mode === 'view';

    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            Username:
            <br/>
            {this.state.text}
          </p>
            {
              view
              ? null
                : (
                    <p> 
                      <input 
                          onChange={this.handleChange}
                          value={this.state.inputText} /> 
                    </p>
                  )
                }
                <button
                  onClick={
                    view
                    ? this.handleEdit
                    : this.handleSave
                  }
                >
                 {view ? 'Edit Username' : 'Save'}
                </button>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
