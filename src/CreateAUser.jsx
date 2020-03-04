/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import 'semantic-ui-css/semantic.min.css';

const validate = require('validate.js');
const passwordValidator = require('password-validator');

// eslint-disable-next-line new-cap
const validPwd = new passwordValidator();
// eslint-disable-next-line no-unused-vars
const reg = new RegExp();
validPwd
  .is().min(8) // Minimum length 8
  .is().max(16) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces()
  // eslint-disable-next-line no-useless-escape
  .has(['(?=.[!@#\$%\^&])']);

async function postData(data) {
  console.log('fetch start');
  fetch('https://peaceful-forest-83015.herokuapp.com/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export class CreateAUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', image: '', password: '', titleValidator: '',
    };
  }

  submitHandler() {
    /* input validation */
    if (validate.isEmpty(this.state.username)) {
      alert('Username is required.\nPlease enter a username.');
    } else if (document.getElementById('photoupload').files.length <= 0) {
      alert('Photo is required.\nPlease upload a photo.');
    } else if (document.getElementById('photoupload').files[0].size > 1048576 * 20) {
      alert('The size of the image you upload is over 20MB.\nPlease upload a smaller photo.');
    } else {
      alert(`You are creating${this.state.username}`);

      // password validation
      alert(validPwd.validate(this.state.password, { list: true }));


      const uploadFile = document.getElementById('photoupload').files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      const usernameInput = this.state.username;
      const passwordInput = this.state.password;
      console.log(usernameInput);
      console.log(passwordInput);
      // console.log();
      // eslint-disable-next-line no-unused-vars
      reader.onload = function onLoad(e) {
        const data = {
          username: usernameInput,
          password: passwordInput,
          image: this.result,
        };
        // console.log("image:"+data.image);
        // eslint-disable-next-line no-unused-vars
        postData(data).then((res) => {
          alert('Create account success!');
          // alert(res.message + res.post._id);
        }).catch((error) => {
          alert(error);
        });
      };
    }
  }

  changeHandler(event) {
    const nam = event.target.name;
    const val = event.target.value;

    /* input validation */
    if (nam === 'username' && validate.isEmpty(val)) {
      this.setState({ validator: 'Username is required.' });
    } else if (nam === 'username' && !validate.isEmpty(val)) {
      this.setState({ validator: '' });
    }
    this.setState({ [nam]: val });
  }

  /*
    photoHandler = (event) => {
        alert('You are creating ' + this.state.username);
        let uploadFile = document.getElementById('photoupload').files[0];
        let reader = new FileReader();
        reader.readAsDataURL(uploadFile);
        const username = this.state.username;
        const password = this.state.password
        reader.onload = function (e) {
            let data = {
                username: username,
                password: password,
                image: 'nonono'
            };
            console.log(data.image);
            postData(data).then(res => {
                alert('Create account success!');
            }).catch(error => {
                alert(error);
            });
        }
    }
*/
  render() {
    return (
      <form>
        <div className="row">
          <div className="col-25">
            <label htmlFor="title">Username:</label>
          </div>
          <div className="col-75">
            <input type="text" name="username" id="username" onChange={this.changeHandler} />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="image">Avatar:</label>
          </div>
          <div className="col-75">
            <input type="file" id="photoupload" name="image" accept="image/*" />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Password:</label>
            <p>(Password must have a length between 8 and 16, must contain at least 1 upper case, 1 lower case, 1 special character,1 number.)</p>
          </div>
          <div className="col-75">
            <input type="text" name="password" id="pwd" onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className="row">
          <input type="button" value="submit" id="submit" onClick={this.submitHandler.bind(this)} />
        </div>
      </form>
    );
  }
}

export default CreateAUser;
