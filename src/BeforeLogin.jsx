/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Login } from './LoginComponent';
import CreateAUser from './CreateAUser';
import './NavBar.css';

export class BeforeLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'active',
      createAUser: 'inactive',
    };
  }

  openLogin() {
    this.setState({
      login: 'active',
      createAUser: 'inactive',
    });
  }

  openCreateAUser() {
    this.setState({
      login: 'inactive',
      createAUser: 'active',
    });
  }

  navbar() {
    return (
      <div className="topnav">
        <a className={this.state.login} href="#login" onClick={this.openLogin}>ZLZ Photo Sharing</a>
        <a className={this.state.createAUser} href="#createAUser" onClick={this.openCreateAUser}>Create an Account</a>
      </div>
    );
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.login === 'active') {
      return (
        <div>
          {this.navbar()}
          <Login />
        </div>
      );
    }
    return (
      <div>
        {this.navbar()}
        <CreateAUser />
      </div>
    );
  }
}
