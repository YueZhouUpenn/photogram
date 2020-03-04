/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import { CreateAPost } from './CreateAPost';
import { TrendingPosts } from './ShowPosts';
import { Profile } from './Profile';
import 'swagger-ui-react/swagger-ui.css';
import { FollowerSug } from './FollowSug';

export class AfterLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: 'active',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    };
  }

  openTrending() {
    this.setState({
      trending: 'active',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openProfile() {
    this.setState({
      trending: 'inactive',
      profile: 'active',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openCreate() {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'active',
      followerSuggestion: 'inactive',
      swagger: 'inactive',
    });
  }

  openFollowerSuggestion() {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'active',
      swagger: 'inactive',
    });
  }

  openSwagger() {
    this.setState({
      trending: 'inactive',
      profile: 'inactive',
      create: 'inactive',
      followerSuggestion: 'inactive',
      swagger: 'active',
    });
  }

  navbar() {
    return (
      <div className="topnav">
        <a className={this.state.trending} href="#trending" onClick={this.openTrending.bind(this)}>Trending Posts</a>
        <a className={this.state.profile} href="#profile" onClick={this.openProfile.bind(this)}>User Profile</a>
        <a className={this.state.create} href="#create" onClick={this.openCreate.bind(this)}>Create New Posts</a>
        <a className={this.state.followerSuggestion} href="#followerSuggestion" onClick={this.openFollowerSuggestion.bind(this)}>Follower Suggestions</a>
        <a className={this.state.swagger} href="#swagger" onClick={this.openSwagger.bind(this)}>Interactive API with Swagger UI</a>
      </div>
    );
  }


  render() {
    if (this.state.profile === 'active') {
      return (
        <div>
          {this.navbar()}
          <Profile user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.create === 'active') {
      return (
        <div>
          {this.navbar()}
          <CreateAPost user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.followerSuggestion === 'active') {
      return (
        <div>
          {this.navbar()}
          <FollowerSug user_id={this.props.user_id} />
        </div>
      );
    } if (this.state.swagger === 'active') {
      return (
        <div>
          {this.navbar()}
          <SwaggerUI url="http://localhost:8081/swagger" />
        </div>
      );
    }
    return (
      <div>
        {this.navbar()}
        <TrendingPosts user_id={this.props.user_id} />
      </div>
    );
  }
}
