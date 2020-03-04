/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import React from 'react';
import { AfterLogin } from './AfterLogin';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      userId: '5debe20ff432d32df02e5f92',
    };
  }

  submit(e) {
    const form = e.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    // Send request to the server
    fetch('http://localhost:8081/login', {
      method: 'POST',
      body: params,
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      this.setState({
        userId: res.userId,
      });
    }).catch((err) => {
      console.error(err);
    });
    this.setState({
      loggedin: true,
    });
  }

  render() {
    if (this.state.loggedin) {
      return (
        <div>
          <AfterLogin user_id={this.state.userId} />
        </div>
      );
    }
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submit.bind(this)}>
          <div>
            <label>Username: </label>
            <input type="text" name="username" pattern=".{2,16}" required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" pattern=".{6,20}" required />
          </div>
          <div>
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    );
  }
}
