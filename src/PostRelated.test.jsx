/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { CreateAPost } from './CreateAPost';
import { ShowAPost, Icon } from './ShowAPost';
import { TrendingPosts, PostCard } from './ShowPosts';

describe('Test post-related components', () => {
  
  it('test CreateAPost', () => {
    const createAPost = mount(<CreateAPost user_id="5debe20ff432d32df02e5f92" />);
    createAPost.setState({
      title: '    ',
    });
    
    createAPost.instance().submitHandler();

    createAPost.find('#submit').simulate('click');

    createAPost.find('#titleinput').simulate('change', { target: { value: '    ' } });
    createAPost.find('#submit').simulate('click');

    createAPost.find('#titleinput').simulate('change', { target: { value: 'The title is not empty.' } });
    createAPost.find('#submit').simulate('click');
    
    createAPost.find('#photoupload').simulate('change', { target: { value: 'This is an image in base64 format.' } });
    createAPost.find('#submit').simulate('click');
    
    createAPost.find('#descriptioninput').simulate('change', { target: { value: 'This is my first post.' } });
    createAPost.find('#submit').simulate('click');
    
    createAPost.find('#taginput').simulate('change', { target: { value: '#travel #Thanksgiving' } });
    createAPost.find('#submit').simulate('click');
  })
})

describe('Test ShowAPost', () => {
  
  it('Test ShowAPost', () => {
    const showAPost = mount(<ShowAPost user_id='5ded0d228bf5f41e9c8fd79a' post_id='5ded120b1ae7c11b14a2e469'/>);
    showAPost.instance().clickLike();
    // showAPost.instance().getSelectedMentions();
    // showAPost.instance().clickComment();
    showAPost.instance().setState({ loaded: true });
    //showAPost.find('#commentinput').simulate('change', { target: { value: 'This is a comment input.' } });
    // showAPost.find('#submit').simulate('click');
  });
  
  it('Test Icon', () => {
    const icon = mount(<Icon user_id='5ded0d228bf5f41e9c8fd79a' />);
    expect(icon.state().follow).toBe('Loading...');
    // icon.instance().clickFollow();
  });
})

describe('Test TrendingPosts', () => {
  
  it('Test TrendingPosts', () => {
    const trending = mount(<TrendingPosts user_id='5ded0d228bf5f41e9c8fd79a' />);
    trending.instance().clickBack();
    trending.setState({ show: true });
    trending.instance().clickBack();
  });
  
  it('Test PostCard', () => {
    const postcard = mount(<PostCard post_id='5ded120b1ae7c11b14a2e469' />);
  });
})
