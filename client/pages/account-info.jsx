import React from 'react';

export default class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      username: '',
      password: ''
    });
    this.handleusername = this.handleusername.bind(this);
    this.handlepassword = this.handlepassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoUser = this.handleDemoUser.bind(this);
  }

  handleusername(event) {
    this.setState({ username: event.target.value });
  }

  handlepassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();
    const { action } = this.props;
    fetch(`/api/auth/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'login';
        } else if (result.user && result.token) {
          this.props.handleSignIn(result);
          window.location.hash = 'eventpage';
        }
      })
      .catch(err => console.error(err));

    this.setState({
      username: '',
      password: ''
    });
  }

  handleDemoUser(event) {
    event.preventDefault();
    const demoUser = {
      username: 'admin',
      password: 'admin1'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(demoUser)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        const token = result.token;
        if (token) {
          window.location.hash = 'eventpage';
          this.props.handleSignIn(result);
        } else {
          window.location.hash = 'login';
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const { action } = this.props;

    return (
      <div className='sign-in'>
        <form className='account-form'onSubmit={this.handleSubmit}>
          <div className='account-header'>
            <h2>{action === 'sign-in' ? 'Welcome Back' : 'Create Account'}</h2>
          </div>
          <div className= 'form-inputs'>
            <label>Username</label>
              <input
              name ="username"
              type ="text"
              id ="signup-username"
              value ={this.state.username}
              onChange ={this.handleusername} />
          </div>
          <div className='form-input'>
            <label>Password</label>
              <input
              name="password"
              type="password"
              id="signup-password"
              value={this.state.password}
              onChange ={this.handlepassword} />
          </div>
          <div className='btn-container'>
            <button className='account-btn' type='submit'>
              <a href="sign-up"></a>{action === 'sign-up' ? 'Sign up' : 'Login'}
            </button>
            <button id='demo-login' onClick={this.handleDemoUser}>Demo</button>
            </div>
            <div className='account-text'><span>
              {action === 'sign-up' ? 'Already a member?' : 'Need an account?'}
            </span>
              <a href={action === 'sign-in' ? '#sign-up' : '#login'} id='login'>
                {action === 'sign-in' ? 'Sign up' : 'Login'}</a>
            </div>
        </form>
      </div>
    );
  }
}
