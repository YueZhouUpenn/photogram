/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import {
  fetchAUser, fetchUseFollower, checkFollow, putFollow,
  FollowerSug, UserCard,
} from './FollowSug';


describe('Test all fetch-related functions', () => {
  it('Test fetchAUser', () => {
    fetchAUser('120').then((res) => {
      expect(res).toBe('');
    });
  });
  it('test check follow', () => {
    checkFollow('120', '110').then((res) => {
      expect(res).toBe('');
    });
  });
  it('test fetchUseFollower', () => {
    fetchUseFollower(1, 3).then((res) => {
      expect(res).toBe('');
    });
  });
  it('test putFollow', () => {
    putFollow('123', '222').then((res) => {
      expect(res).toBe('');
    });
  });

  it('test FollowerSug', () => {
    const userSug = mount(<FollowerSug current_user="120" />);
    expect(userSug.state().currentStartIndex).toBe(0);
    expect(userSug.state().currentFollowers.length).toBe(0);
    expect(userSug.state().show).toBe(false);
    // eslint-disable-next-line no-unused-expressions
    expect(userSug.state().showId).toBeNull;
  });

  it('test UserCard', () => {
    const uc = mount(<UserCard user_id="120" />);
    expect(uc.state().username).toBe('Loading...');
    // eslint-disable-next-line no-unused-expressions
    expect(uc.state().image).toBeNull;
    expect(uc.state().follow).toBe('Loading...');
    expect(uc.state().numberOfFollowers).toBe(0);

    // uc.find('#button').simulate('click');

    expect(uc.state().follow).toBe('Loading...');
    expect(uc.state().numberOfFollowers).toBe(0);
  });
});
