/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable import/named */
import React, { Component } from 'react';
import {
  Card, Icon, Image, Button,
} from 'semantic-ui-react';
import './NavBar.css';

/* fetch user with most followers */// array of {_id}
export async function fetchUseFollower(startIndex, numberOfFollowers) {
  console.log('fetch start');
  const res = await fetch(`http://localhost:8081/recFollow?start=${startIndex}&follows=${numberOfFollowers}`);
  const data = await res.json();// is a user information
  return data;
}

export class FollowerSug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStartIndex: 0,
      currentFollowers: [],
      show: false,
      showId: '',
    };
  }

  async componentDidMount() {
    await fetchUseFollower(this.state.currentStartIndex, 3).then((res) => {
      this.setState({
        currentFollowers: res.data, // give the array to currentFollowers
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

  clickNext() {
    if (this.state.currentFollowers.length === 3) {
      this.setState({
        currentStartIndex: this.state.currentStartIndex + 3,
      });
    }
    fetchUseFollower(this.state.currentStartIndex, 3).then((res) => {
      this.setState({
        currentFollowers: res.data, // get currentFollower array for the user
      });
      console.log(res.data);
    });
  }

  clickPrev() {
    if (this.state.currentStartIndex < 3) {
      this.setState({
        currentStartIndex: this.state.currentStartIndex - 4,
      });
    }

    fetchUseFollower(this.state.currentStartIndex, 4).then((res) => {
      this.setState({
        currentFollowers: res.data,
      });
      console.log(res.data);
    });
  }

  render() {
    const UserCards = [];
    // eslint-disable-next-line array-callback-return
    this.state.currentFollowers.map((value, index) => {
      UserCards.push(
        <div ley={index} className="postcard" value={value._id} onClick={this.clickShow.bind(this)}>
          <UserCard current_user={this.props.user_id} user_id={value._id} />
        </div>,
      );
    });

    return (
      <div className="center">
        <div className="flex-container">

          {UserCards}


        </div>
        <div className="center">

          <Button animated onClick={this.clickNext}>
            <Button.Content visible>Prev</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
          <Button animated onClick={this.clickPrev}>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </div>

    );
  }
}
//= ========================================================

/* fetch a user by id */
export async function fetchAUser(userId) {
  const res = await fetch(`http://localhost:8081/user/${userId}`);// fetch the user info using userId
  const data = await res.json();
  return data;
}
/* check whether user1 has followed user2 */
export async function checkFollow(user1, user2) {
  return fetch(`http://localhost:8081/follow?follower=${user1}&followee=${user2}`).then((res) => res.json());
}

/* follow/unfollow */
export async function putFollow(user1, user2) {
  return fetch(`http://localhost:8081/follow/put?follower=${user1}&followee=${user2}`).then((res) => res.json());
}

//= ====================================================================
export class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Loading...',
      image: '',
      follow: 'Loading...',
      numberOfFollowers: 0,
    };
  }

  async componentDidMount() {
    // SUGGEST USER'S ID
    await fetchAUser(this.props.user_id).then((res) => {
      this.setState({
        username: res.username,
        image: res.image,
        // numberOfFollowers:res.followed.length
      });
    });
    /* Check whether user1 has followed user2 */
    checkFollow(this.props.current_user, this.props.user_id).then((res) => {
      if (res.data) {
        this.setState({ follow: 'unfollow' });
      } else {
        this.setState({ follow: 'follow' });
      }
    });
  }

  // click to follow the recommended user
  clickFollow() {
    putFollow(this.props.current_user, this.props.user_id).then((res) => {
      if (res.action === 'unfollow') {
        this.setState({ follow: 'follow', numberOfFollowers: this.state.numberOfFollowers - 1 });
      } else {
        this.setState({ follow: 'unfollow', numberOfFollowers: this.state.numberOfFollowers + 1 });
      }
    });
  }

  render() {
    return (
      <Card>
        <Image src={this.state.image} value={this.props.user_id} alt="Loading..." wrapped ui={false} />
        <Card.Content>
          <Card.Header value={this.props.user_id}>{this.state.username}</Card.Header>
          <Card.Description value={this.props.user_id}>
            <p>{this.state.numberOfFollowers}</p>
            <p>
followed by:
              {this.state.numberOfFollowers}
              {' '}
followers.
            </p>
          </Card.Description>
          <div onClick={this.clickFollow.bind(this)}>
            <Button primary value={this.state.follow}>{this.state.follow}</Button>
          </div>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
      </Card>
    );
  }
}
