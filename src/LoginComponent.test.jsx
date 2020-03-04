import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Login } from './LoginComponent';
import { Item } from 'semantic-ui-react';

describe('Login Component tests',()=>{
  
  it('testing login:',()=>{
    const log = mount(<Login userId='120'/>)
    expect(log.state().loggin).toBe(undefined)
    expect(log.state().userId).toBe('5debe20ff432d32df02e5f92')
    // log.find('#submit').simulate('click')
    
    expect(log.state().loggin).toBe(undefined)
    expect(log.state().userId).toBe("5debe20ff432d32df02e5f92")

  })
  
  
})