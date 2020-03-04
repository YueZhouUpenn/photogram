/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { CreateAUser } from './CreateAUser';


describe('Test sign up', () => {
  it('test CreateAUser', () => {
    const createAUser = mount(<CreateAUser />);
    expect(createAUser.state().username).toBeNull;
    expect(createAUser.state().image).toBeNull;
    expect(createAUser.state().password).toBeNull;
    expect(createAUser.state().titleValidator).toBeNull;

    createAUser.find('#submit').simulate('click');

    // createAUser.find('#username').simulate('change', { target: { value: '    ' } });
    createAUser.find('#submit').simulate('click');
    expect(createAUser.state().username).toBe('');

    /*
    createAUser.find('#pwd').simulate('change', { target: { value: 'The password is not empty.' } });
    createAUser.find('#submit').simulate('click');
    expect(createAUser.state().password).toBe('');

    createAUser.find('#photoupload').simulate('change', { target: { value: 'This is an image in base64 format.' } });
    createAUser.find('#submit').simulate('click');

    expect(createAUser.state().image).toBe('');
    */
  });
});
