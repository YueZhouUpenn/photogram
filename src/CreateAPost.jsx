/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React from 'react';
import './uploadStyle.css';
import 'semantic-ui-css/semantic.min.css';

const validate = require('validate.js');

async function postData(data) {
  return fetch('http://localhost:8081/post', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export class CreateAPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      description: '',
      tag: '',
      visibility: '1',
      titleValidator: '',
    };
  }

  submitHandler() {
    /* Input validation */
    if (validate.isEmpty(this.state.title)) {
      alert('Title is required.\nPlease enter a title.');
    } else if (document.getElementById('photoupload').files.length <= 0) {
      alert('Photo is required.\nPlease upload a photo.');
    } else if (document.getElementById('photoupload').files[0].size > 1048576 * 20) {
      alert('The size of the image you upload is over 20MB.\nPlease upload a smaller photo.');
    } else {
      console.log(this.state.title);
      console.log(this.props.user_id);

      alert(`You are submitting "${this.state.title}"`);
      const authorInput = this.props.user_id;
      const titleInput = this.state.title;
      const descriptionInput = this.state.description;
      const tagInput = this.state.tag;
      const visibilityInput = document.getElementById('visibility').value;
      let postIdReturn;
      /* Convert photo to data url and post it */
      const uploadFile = document.getElementById('photoupload').files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onload = function (e) {
        const data = {
          author: authorInput,
          title: titleInput,
          image: this.result,
          description: descriptionInput,
          tag: tagInput,
          visibility: visibilityInput,
        };
        postData(data).then((res) => {
          alert(res.message);
        }).catch((error) => {
          alert(error);
        });
      };
    }
  }

  changeHandler(event) {
    const nam = event.target.name;
    const val = event.target.value;
    /* Input validation */
    if (nam === 'title' && validate.isEmpty(val)) {
      this.setState({ validator: 'Title is required.' });
    } else if (nam === 'title' && !validate.isEmpty(val)) {
      this.setState({ validator: '' });
    }
    this.setState({ [nam]: val });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-25">
            <label>Title:</label>
          </div>
          <div className="col-75">
            <input type="text" id="titleinput" name="title" placeholder="Enter title here (required)" maxLength="200" value={this.state.title} onChange={this.changeHandler.bind(this)} required />
            <p id="validator">{this.state.validator}</p>
          </div>

        </div>
        <div className="row">
          <div className="col-25">
            <label>Photo:</label>
          </div>
          <div className="col-75">
            <input type="file" id="photoupload" name="image" accept="image/png, image/jpeg" required />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Description:</label>
          </div>
          <div className="col-75">
            <textarea id="descriptioninput" name="description" placeholder="Enter description here" maxLength="2000" value={this.state.description} onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Tag:</label>
          </div>
          <div className="col-75">
            <input type="text" id="taginput" name="tag" placeholder="Enter tags here (example: #travel #Canada #Thanksgiving)" maxLength="200" value={this.state.tag} onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Visibility:</label>
          </div>
          <div className="col-75">
            <select id="visibility">
              <option value="1">Visible to everyone</option>
              <option value="0">Visible to followers</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button className="ui button" id="submit" onClick={this.submitHandler.bind(this)}>submit</button>
        </div>
      </div>
    );
  }
}
