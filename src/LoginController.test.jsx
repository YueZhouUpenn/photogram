/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { BeforeLogin } from './BeforeLogin';
import { AfterLogin } from './AfterLogin';


describe('Login controller tests', () => {
  it('BeforeLogin: user login and create an account', () => {
    const beforeLogin = mount(<BeforeLogin />);
    expect(beforeLogin.state().login).toBe('active');
    expect(beforeLogin.state().createAUser).toBe('inactive');

    beforeLogin.instance().openCreateAUser();
    expect(beforeLogin.state().login).toBe('inactive');
    expect(beforeLogin.state().createAUser).toBe('active');

    beforeLogin.instance().openLogin();
    expect(beforeLogin.state().login).toBe('active');
    expect(beforeLogin.state().createAUser).toBe('inactive');
  });

  it('navigation bar controlling function', () => {
    const afterLogin = mount(<AfterLogin />);
    expect(afterLogin.state().trending).toBe('active');
    expect(afterLogin.state().profile).toBe('inactive');
    expect(afterLogin.state().create).toBe('inactive');
    expect(afterLogin.state().followerSuggestion).toBe('inactive');
    expect(afterLogin.state().swagger).toBe('inactive');

    afterLogin.instance().openProfile();
    expect(afterLogin.state().trending).toBe('inactive');
    expect(afterLogin.state().profile).toBe('active');
    expect(afterLogin.state().create).toBe('inactive');
    expect(afterLogin.state().followerSuggestion).toBe('inactive');
    expect(afterLogin.state().swagger).toBe('inactive');

    afterLogin.instance().openCreate();
    expect(afterLogin.state().trending).toBe('inactive');
    expect(afterLogin.state().profile).toBe('inactive');
    expect(afterLogin.state().create).toBe('active');
    expect(afterLogin.state().followerSuggestion).toBe('inactive');
    expect(afterLogin.state().swagger).toBe('inactive');

    afterLogin.instance().openFollowerSuggestion();
    expect(afterLogin.state().trending).toBe('inactive');
    expect(afterLogin.state().profile).toBe('inactive');
    expect(afterLogin.state().create).toBe('inactive');
    expect(afterLogin.state().followerSuggestion).toBe('active');
    expect(afterLogin.state().swagger).toBe('inactive');

    afterLogin.instance().openSwagger();
    expect(afterLogin.state().trending).toBe('inactive');
    expect(afterLogin.state().profile).toBe('inactive');
    expect(afterLogin.state().create).toBe('inactive');
    expect(afterLogin.state().followerSuggestion).toBe('inactive');
    expect(afterLogin.state().swagger).toBe('active');

    afterLogin.instance().openTrending();
    expect(afterLogin.state().trending).toBe('active');
    expect(afterLogin.state().profile).toBe('inactive');
    expect(afterLogin.state().create).toBe('inactive');
    expect(afterLogin.state().followerSuggestion).toBe('inactive');
    expect(afterLogin.state().swagger).toBe('inactive');
  });
});
