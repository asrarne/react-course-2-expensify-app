import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';
import {
    googleAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider,
    githubAuthProvider
    } from '../../firebase/firebase';

let startLogin, wrapper

beforeEach(() => {
    startLogin = jest.fn();
    wrapper = shallow(<LoginPage
                            startLogin={startLogin}
                            googleAuthProvider={googleAuthProvider}
                            facebookAuthProvider={facebookAuthProvider}
                            twitterAuthProvider={twitterAuthProvider}
                            githubAuthProvider={githubAuthProvider}
                        />);
});

test('should render login page correctly',() => {
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click with Google provider', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith(googleAuthProvider);
});

test('should call startLogin on button click with Facebook provider', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith(facebookAuthProvider);
});

test('should call startLogin on button click with Twitter provider', () => {
    wrapper.find('button').at(2).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith(twitterAuthProvider);
});

test('should call startLogin on button click with GitHub provider', () => {
    wrapper.find('button').at(3).simulate('click');
    expect(startLogin).toHaveBeenLastCalledWith(githubAuthProvider);
});