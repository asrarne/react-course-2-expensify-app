import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import {
        googleAuthProvider,
        facebookAuthProvider,
        twitterAuthProvider,
        githubAuthProvider
        } from '../firebase/firebase';

export class LoginPage extends React.Component {
    onFaceBookClick = () => {
        this.props.startLogin(this.props.facebookAuthProvider);
    };

    onGoogleClick = () => {
        this.props.startLogin(this.props.googleAuthProvider);
    };

    onTwitterClick = () => {
        this.props.startLogin(this.props.twitterAuthProvider);
    };

    onGithubClick = () => {
        this.props.startLogin(this.props.githubAuthProvider);
    };

    render () {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expensify</h1>
                    <p>It's time to get your expenses under control.</p>
                    <div className="box-layout__action">
                        <button className="button" onClick={this.onGoogleClick}>Login with Google</button>
                        <button className="button" onClick={this.onFaceBookClick}>Login with Facebook</button>
                        <button className="button" onClick={this.onTwitterClick}>Login with Twitter</button>
                        <button className="button" onClick={this.onGithubClick}>Login with GitHub</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({
    googleAuthProvider: googleAuthProvider,
    facebookAuthProvider: facebookAuthProvider,
    twitterAuthProvider: twitterAuthProvider,
    githubAuthProvider: githubAuthProvider
});

const mapDispatchTOProps = (dispatch) => ({
    startLogin: (data) => dispatch(startLogin(data))
});

export default connect(mapStateToProps, mapDispatchTOProps)(LoginPage);