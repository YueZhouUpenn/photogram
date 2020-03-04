/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import {
  Card, Icon, Image, Button,
} from 'semantic-ui-react';
import { ShowAPost } from './ShowAPost';
import './NavBar.css';

/* fetch trending posts */
export async function fetchTrending(limit) {
  console.log('fetch start');
  const res = await fetch(`http://localhost:8081/trending?limit=${limit}`);
  const data = await res.json();
  return data;
}

export class TrendingPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosts: [],
      show: false,
      showId: '',
      // eslint-disable-next-line react/no-unused-state
      numberOfPosts: 6,
    };
  }

  async componentDidMount() {
    await fetchTrending(20).then((res) => {
      this.setState({
        currentPosts: res.data,
      });
      console.log(res.data);
    });
  }

  clickShow(evt) {
    if (evt.target.value !== undefined && evt.target.value !== null) {
      this.setState({
        show: true,
        showId: evt.target.value,
      });
    }
  }

  clickBack() {
    this.setState({
      show: false,
    });
  }

  render() {
    const PostCards = [];
    // eslint-disable-next-line array-callback-return
    this.state.currentPosts.map((value) => {
      PostCards.push(
        <div key={`trending${value._id}`} className="postcard" value={value._id} onClick={this.clickShow.bind(this)}>
          <PostCard post_id={value._id} />
        </div>,
      );
    });

    if (!this.state.show) {
      return (
        <div className="center">
          <div className="flex-container">

            {PostCards}


          </div>
          <div className="center" onClick={this.loadmore} />
        </div>


      );
    }
    return (
      <div>
        <Button secondary onClick={this.clickBack}>Back to Trending Posts</Button>
        <ShowAPost user_id={this.props.user_id} post_id={this.state.showId} />

      </div>
    );
  }
}

/* fetch a post by id */
export async function fetchAPost(postId) {
  const res = await fetch(`http://localhost:8081/post/${postId}`);
  const data = await res.json();
  return data;
}

export class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      title: 'Loading...',
      author: 'Loading...',
      description: 'Loading...',
      numberOfLikes: 0,
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

  clickLike(event) {
    console.log('liked');
    event.stopPropagation();
  }

  render() {
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
          <Button primary value={this.props.post_id}>Have a look</Button>
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
