/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
/* eslint-disable max-classes-per-file */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-return-await */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Menu, Image, Button, Card, Icon,
} from 'semantic-ui-react';
import { fetchAPost } from './ShowAPost';
import './Profile.css';

const validate = require('validate.js');


async function putData(data) {
  return fetch('http://localhost:8081/post/put', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

async function deleteData(data) {
  return fetch('http://localhost:8081/post/delete', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

async function fetchUserProfile(id) {
  return await fetch(`http://localhost:8081/profile/${id}`).then((res) => res.json());
}

async function fetchUserProfileComment(id) {
  return await fetch(`http://localhost:8081/profile/comment/${id}`).then((res) => res.json());
}

async function fetchUserProfileLike(id) {
  return await fetch(`http://localhost:8081/profile/like/${id}`).then((res) => res.json());
}

async function fetchUserProfileFollow(id) {
  return await fetch(`http://localhost:8081/profile/follow/${id}`).then((res) => res.json());
}

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Loading...',
      image: '',
      posts: [],
      followers: [],
      managePost: 'active',
      activityFeed: 'inactive',
      currentPosts: [],
      commentsInfo: [],
      likingInfo: [],
      followingInfo: [],
    };
  }

  componentDidMount() {
    const postItems = [];
    fetchUserProfile(this.props.user_id).then((res) => {
      console.log(res);
      this.setState({
        username: res.username,
        image: res.image,
        posts: res.posts,
        followers: res.followers,
        managePost: 'active',
        activityFeed: 'inactive',
      });
      this.state.posts.map((value) => {
        postItems.push(
          <div key={value}>
            <EditPostCard user_id={this.props.user_id} post_id={value} />
          </div>,
        );
      });
      this.setState({
        currentPosts: postItems,
      });
    });
  }

  openManagePost() {
    this.setState({
      managePost: 'active',
      activityFeed: 'inactive',
    });
  }

  openActivityFeed() {
    this.setState({
      managePost: 'inactive',
      activityFeed: 'active',
    });
    fetchUserProfileComment(this.props.user_id).then((res) => {
      this.setState({
        commentsInfo: res.data,
      });
    });
    fetchUserProfileLike(this.props.user_id).then((res) => {
      this.setState({
        likingInfo: res.data,
      });
    });
    fetchUserProfileFollow(this.props.user_id).then((res) => {
      this.setState({
        followingInfo: res.data,
      });
    });
  }

  navbar() {
    return (
      <Menu>
        <Menu.Item
          name="managePost"
          active={this.state.managePost === 'active'}
          onClick={this.openManagePost}
        >
          Manage Your Posts
        </Menu.Item>
        <Menu.Item
          name="activityFeed"
          active={this.state.activityFeed === 'active'}
          onClick={this.openActivityFeed}
        >
          Activity Feed
        </Menu.Item>
      </Menu>
    );
  }

  profileHeader() {
    return (
      <div>
        <div className="topBackground">
          <img src={this.state.image} alt=" " id="profile_img" />
        </div>
        <div className="profile_container">
          <h1>{this.state.username}</h1>
          <p>
            {this.state.username}
            {' '}
have
            {' '}
            {this.state.posts.length}
            {' '}
posts
            {' '}
          </p>
          <p>
            {this.state.username}
            {' '}
have
            {' '}
            {this.state.followers.length}
            {' '}
followers
            {' '}
          </p>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.activityFeed === 'active') {
      const commentItems = [];
      this.state.commentsInfo.map((item, index) => {
        if (item.post !== null) {
          commentItems.push(
            <div key="comment">
              <p>
You commentted "
                {item.post.title}
" which is created at
                {item.post.create.replace(/T/gi, '-').replace(/Z/gi, ' ')}
              </p>
            </div>,
          );
        }
      });
      const followingItems = [];
      this.state.followingInfo.map((item) => {
        if (item.followee !== null) {
          followingItems.push(
            <div>
              <p>
You followed
                {item.followee.username}
                {' '}
at
                {item.time.replace(/T/gi, '-').replace(/Z/gi, ' ')}
              </p>
            </div>,
          );
        }
      });
      const likingItems = [];
      this.state.likingInfo.map((item) => {
        if (item.likee !== null) {
          likingItems.push(
            <div>
              <p>
You liked "
                {item.likee.title}
" at
                {item.time.replace(/T/gi, '-').replace(/Z/gi, ' ')}
              </p>
            </div>,
          );
        }
      });

      return (
        <div>
          {this.profileHeader()}
          {this.navbar()}
          <h1>Activity Feed</h1>

          <h2>Comment</h2>
          <div>{commentItems}</div>

          <h2>Follow</h2>
          <div>{followingItems}</div>

          <h2>Like</h2>
          <div>{likingItems}</div>
        </div>
      );
    }
    return (
      <div>
        {this.profileHeader()}
        {this.navbar()}
        <div className="flex-container">
          {this.state.currentPosts}
        </div>
      </div>
    );
  }
}

export class EditPostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: 'Loading...',
      author: 'Loading...',
      description: 'Loading...',
      numberOfLikes: 0,
      edit: false,
      titleValidator: '',
      delete: 'Delete',
    };
  }

  async componentDidMount() {
    await fetchAPost(this.props.post_id).then((res) => {
      this.setState({
        image: res.post.image,
        title: res.post.title,
        author: res.post.author.username,
        description: res.post.description,
        numberOfLikes: res.post.numberOfLikes,

      });
    });
  }

  editPost() {
    console.log(this.state.edit);
    this.setState({
      edit: true,
    });
    console.log(this.state.edit);
  }

  deletePost() {
    deleteData({
      id: this.props.post_id,
      user_id: this.props.user_id,
    }).then((res) => {
      alert(res.message);
    }).catch((err) => {
      console.error(err);
    });
    this.setState({
      delete: 'Deleted',
    });
  }

  submitHandler(event) {
    /* Input validation */
    if (validate.isEmpty(this.state.title)) {
      alert('Title is required.\nPlease enter a title.');
    } else {
      alert(`You are submitting ${this.state.title}`);
      const titleInput = this.state.title;
      const descriptionInput = this.state.description;
      const data = {
        id: this.props.post_id,
        title: titleInput,
        description: descriptionInput,
      };
      this.setState({
        edit: false,
      });
      putData(data).then((res) => {
        alert(res.message);
      }).catch((error) => {
        alert(error);
      });
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
    if (this.state.edit) {
      return (
        <form>
          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Title:</label>
            </div>
            <div className="col-75">
              <input type="text" name="title" maxLength="200" value={this.state.title} onChange={this.changeHandler.bind(this)} required />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="description">Description:</label>
            </div>
            <div className="col-75">
              <textarea name="description" maxLength="2000" value={this.state.description} onChange={this.changeHandler.bind(this)} />
            </div>
          </div>
          <div className="row">
            <input type="button" value="submit" onClick={this.submitHandler} />
          </div>
        </form>
      );
    }
    return (
      <Card>
        <Image src={this.state.image} value={this.props.post_id} alt="Loading..." wrapped ui={false} />
        <Card.Content>
          <Card.Header value={this.props.post_id}>{this.state.title}</Card.Header>
          <Card.Meta>
            <span value={this.props.post_id} className="date">{this.state.author}</span>
          </Card.Meta>
          <Card.Description value={this.props.post_id}>
            {this.state.description}
          </Card.Description>
          <Button primary onClick={this.editPost.bind(this)}>Edit</Button>
          <Button secondary onClick={this.deletePost}>{this.state.delete}</Button>
        </Card.Content>
        <Card.Content extra>

          <a>
            <Icon name="like" />
            {this.state.numberOfLikes}
            {' '}
people have liked this post.
          </a>
        </Card.Content>
      </Card>
    );
  }
}
