/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { Profile, EditPostCard } from './Profile';
import './Profile.css';

describe('Profile controller tests', () => {
  it('BeforeLogin: user login and create an account', () => {
    const profile = mount(<Profile user_id="120" />);

    expect(profile.state().username).toBe('Loading...');
    expect(profile.state().image).toBe('');
    expect(profile.state().posts.length).toBe(0);
    expect(profile.state().followers.length).toBe(0);
    expect(profile.state().managePost).toBe('active');
    expect(profile.state().activityFeed).toBe('inactive');
    expect(profile.state().currentPosts.length).toBe(0);
    expect(profile.state().commentsInfo.length).toBe(0);
    expect(profile.state().likingInfo.length).toBe(0);
    expect(profile.state().followingInfo.length).toBe(0);

    profile.instance().openManagePost();
    expect(profile.state().managePost).toBe('active');
    expect(profile.state().activityFeed).toBe('inactive');

    profile.instance().openActivityFeed();
    expect(profile.state().managePost).toBe('inactive');
    expect(profile.state().activityFeed).toBe('active');

    profile.instance().navbar();
    profile.instance().profileHeader();

    const editPostCard = mount(<EditPostCard user_id="120" post_id="911" />);

    expect(editPostCard.state().image).toBe('');
    expect(editPostCard.state().title).toBe('Loading...');
    expect(editPostCard.state().author).toBe('Loading...');
    expect(editPostCard.state().description).toBe('Loading...');
    expect(editPostCard.state().numberOfLikes).toBe(0);
    expect(editPostCard.state().edit).toBe(false);
    expect(editPostCard.state().titleValidator).toBe('');
    expect(editPostCard.state().delete).toBe('Delete');

    editPostCard.instance().editPost();
    expect(editPostCard.state().edit).toBe(true);
    editPostCard.instance().deletePost();
    expect(editPostCard.state().delete).toBe('Deleted');
    editPostCard.instance().submitHandler();
    expect(editPostCard.state().edit).toBe(false);
    editPostCard.instance().changeHandler({ target: { name: 'try', value: 'again' } });
  });
});
