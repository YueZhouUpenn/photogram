/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './ShowAPost.css';

/* fetch a post by id */
export async function fetchAPost(postId) {
  const res = await fetch(`http://localhost:8081/post/${postId}`);
  const data = await res.json();
  return data;
}

/* check whether the user has liked the post by userId and postId */
export async function checkLike(userId, postId) {
  // console.log('http://localhost:8081/like?liker=' + userId + '&likee=' + postId');
  const res = await fetch(`http://localhost:8081/like?liker=${userId}&likee=${postId}`);
  const data = await res.json();
  return data;
}

/* like or unlike the post by userId and postId */
export async function putLike(userId, postId) {
  const res = await fetch(`http://localhost:8081/like/put?liker=${userId}&likee=${postId}`);
  const data = await res.json();
  return data;
}

/* submit a comment */
async function postComment(data) {
  return fetch('http://localhost:8081/comment', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

class ShowAPost extends React.Component {
  constructor(props) {
    super(props);
    /* Set up state */
    this.state = {
      author: '',
      title: 'Loading...',
      image: '',
      description: 'Loading...',
      create: 'Loading...',
      numberOfLikes: 0,
      commentInput: 'Comment here',
      comment: [],
      tag: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    /* Fetch the post by id */
    await fetchAPost(this.props.post_id).then((res) => {
      this.setState({
        author: res.post.author,
        title: res.post.title,
        image: res.post.image,
        description: res.post.description,
        create: res.post.create,
        numberOfLikes: res.post.numberOfLikes,
        comment: res.post.comment,
        tag: res.post.tag,
        loaded: true,
      });
    });
    /* Check whether the user has liked this post */
    checkLike(this.props.user_id, this.props.post_id).then((res) => {
      if (res.data) {
        document.getElementById('thumb').style.color = 'red';
      } else {
        document.getElementById('thumb').style.color = 'black';
      }
    });
  }

  clickLike() {
    putLike(this.props.user_id, this.props.post_id).then((res) => {
      if (res.action === 'like') {
        document.getElementById('thumb').style.color = 'red';
        this.setState({ numberOfLikes: this.state.numberOfLikes + 1 });
      } else {
        document.getElementById('thumb').style.color = 'black';
        this.setState({ numberOfLikes: this.state.numberOfLikes - 1 });
      }
    });
  }

  getSelectedMentions() {
    const el = document.getElementById('mention');
    const result = [];
    const options = el && el.options;
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].selected) {
        result.push({
          username: options[i].value,
          id: options[i].key,
        });
      }
    }
    console.log(result);
    return result;
  }

  changeHandler(event) {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  }

  clickComment() {
    alert(`You are submitting ${this.state.commentInput}`);
    const mentionList = this.getSelectedMentions();
    const sentMentionList = [];
    // eslint-disable-next-line array-callback-return
    mentionList.map((item) => {
      sentMentionList.push(item.id);
    });
    console.log(mentionList);
    const data = {
      postId: this.props.post_id,
      authorId: this.props.user_id,
      content: this.state.commentInput,
      mention: sentMentionList,
    };
    postComment(data).then((res) => {
      this.setState({
        comment: this.state.comment.concat({
          author: { _id: this.props.user_id },
          content: this.state.commentInput,
          mention: mentionList,
        }),
      });
      alert(res.message);
      this.setState({ commentInput: 'Comment here' });
    });
  }

  deleteComment(event) {
    console.log(Number(event.target.id));
    console.log(event.target.value);
    fetch('http://localhost:8081/comment/delete', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ postId: this.props.post_id, commentId: event.target.id }),
    }).then((res) => res.json()).then((res) => alert(res.message))
      .catch((err) => console.error(err));
    const filteredArray = this.state.comment.filter((item) => item._id !== event.target.id);
    this.setState({ comment: filteredArray });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <h1>Loading the post...</h1>);
    }
    const commentItems = [];
    const mentionUsers = new Map();
    mentionUsers.set(this.state.author._id, this.state.author.username);
    console.log(mentionUsers);
    for (const [index, cmt] of this.state.comment.entries()) {
      console.log(cmt.mention);
      let mention = '';
      for (const mentionee of cmt.mention) {
        mention = `${mention}@${mentionee.username}  `;
      }
      console.log(mention);
      if (cmt.author._id === this.props.user_id) {
        commentItems.push(
          <div key={`comment${cmt._id}`} className="container darker">
            <Icon className="right" user1={this.props.user_id} user2={cmt.author._id} />
            <p>{mention}</p>
            <p>{cmt.content}</p>
            <span className="time-left">{cmt.time}</span>
            <input id={cmt._id} type="button" value="delete" onClick={this.deleteComment.bind(this)} />
            <p>{cmt._id}</p>
          </div>,
        );
      } else {
        commentItems.push(
          <div key={cmt._id} className="container darker">
            <Icon className="right" user1={this.props.user_id} user2={cmt.author._id} />
            <p>{mention}</p>
            <p>{cmt.content}</p>
            <span className="time-left">{cmt.time}</span>
          </div>,
        );
      }
      if (!mentionUsers.has(cmt.author._id)) {
        mentionUsers.set(cmt.author._id, cmt.author.username);
      }
    }

    const mentionItems = [];
    for (const [key, name] of mentionUsers.entries()) {
      mentionItems.push(
        <option value={name} key={key}>{name}</option>,
      );
    }

    const tagItems = [];

    for (const [index, tagItem] of this.state.tag.entries()) {
      tagItems.push(
        <label key={`tag${index}`} className="tag">{tagItem}</label>,
      );
    }


    return (
      <div id="post">
        <div>
          <h1 id="title1">{this.state.title}</h1>
          {tagItems}
        </div>
        <div className="container">
          <Icon className="left" user1={this.props.user_id} user2={this.state.author._id} />
          <div>
            <img id="photo1" src={this.state.image} alt="Loading..." />
            <p id="description1">{this.state.description}</p>
          </div>
          <span className="time-right">{this.state.create}</span>
          <div>
            <i id="thumb" className="fa fa-thumbs-up" onClick={this.clickLike.bind(this)} />
            <span>
              {this.state.numberOfLikes}
              {' '}
people have liked this post.
            </span>
          </div>
          <div>
            {commentItems}
          </div>
          <div>
            <h4>Comment here</h4>
            <label>@mention: </label>
            <select id="mention" multiple size="10">
              {mentionItems}
            </select>
            <textarea name="commentInput" id="commentinput" onChange={this.changeHandler.bind(this)} value={this.state.commentInput} />
            <input type="button" id="submit" value="submit" onClick={this.clickComment.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

/* fetch a user by id */
export async function fetchAUser(userId) {
  const res = await fetch(`http://localhost:8081/user/${userId}`);
  const data = await res.json();
  return data;
}

/* check whether user1 has followed user2 */
export async function checkFollow(user1, user2) {
  const res = await fetch(`http://localhost:8081/follow?follower=${user1}&followee=${user2}`);
  const data = await res.json();
  return data;
}

/* follow/unfollow */
export async function putFollow(user1, user2) {
  const res = await fetch(`http://localhost:8081/follow/put?follower=${user1}&followee=${user2}`);
  const data = await res.json();
  return data;
}

/* A component to show icon, username and follow/unfollow */
class Icon extends React.Component {
  constructor(props) {
    super(props);
    /* Set up state */
    this.state = {
      username: 'Loading...',
      image: '',
      follow: 'Loading...',
      numberOfFollowers: 0,
      loaded: false,
    };
  }

  clickFollow() {
    putFollow(this.props.user1, this.props.user2).then((res) => {
      if (res.action === 'unfollow') {
        this.setState({ follow: 'follow', numberOfFollowers: this.state.numberOfFollowers - 1 });
      } else {
        this.setState({ follow: 'unfollow', numberOfFollowers: this.state.numberOfFollowers + 1 });
      }
    });
  }

  async componentDidMount() {
    /* Fetch the user by id */
    await fetchAUser(this.props.user2).then((res) => {
      this.setState({
        username: res.username,
        image: res.image,
        numberOfFollowers: res.numberOfFollowers,
        loaded: true,
      });
    });
    /* Check whether user1 has followed user2 */
    await checkFollow(this.props.user1, this.props.user2).then((res) => {
      if (res.data) {
        this.setState({ follow: 'unfollow' });
      } else {
        this.setState({ follow: 'follow' });
      }
    });
  }

  render() {
    return (
      <div>
        <img className="icon" src={this.state.image} alt="Loading..." />
        <p className="iconName">{this.state.username}</p>
        <input type="button" value={this.state.follow} onClick={this.clickFollow.bind(this)} />
        <span className="followDesc">
          {this.state.numberOfFollowers}
          {' '}
people have followed this user.
        </span>
      </div>
    );
  }
}

export { ShowAPost, Icon };
