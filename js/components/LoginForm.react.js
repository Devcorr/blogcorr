/**
 * @jsx React.DOM
 */

var React = require('react');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var LoginForm = React.createClass({

    getInitialState: function() {
        return {
            user: UserStore.getCurrentUser(),
            usernameInput: "",
            passwordInput: ""
        }
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onDataChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onDataChange);
    },
    /**
     * @return {object}
     */
    render: function() {

        if (this.state.user) {
            return (<div id="accountSection">
                        <div id="loggedInSection">
                            Hi, {this.state.user.get('username')}
                            <button id="logOutButton" onClick={this._logOut}>Log Out</button>
                        </div>
                    </div>);
        } else {
            return (
                <div id="accountSection">
                    <form id="loginForm" onSubmit={this._logIn}>
                        <input
                        type="text"
                        placeholder="Username"
                        onChange={this._onViewChange}
                        ref="username"
                        value={this.state.usernameInput}
                        />
                        <input
                        type="text"
                        placeholder="Password"
                        onChange={this._onViewChange}
                        ref="password"
                        value={this.state.passwordInput}
                        />
                        <input value="Log In" type="submit" />
                    </form>
                </div>
            );
        }
    },

    _onDataChange: function() {
        this.setState({
            user: UserStore.getCurrentUser(),
            usernameInput: '',
            passwordInput: ''
        });
    },

    _onViewChange: function() {
        this.setState({
            user: this.state.user,
            usernameInput: this.refs.username.getDOMNode().value,
            passwordInput: this.refs.password.getDOMNode().value
        });
    },

    _logIn: function() {
        event.preventDefault();
        UserActions.logIn(this.state.usernameInput, this.state.passwordInput);
    },

    _logOut: function() {
        event.preventDefault();
        UserActions.logOut();
    }

});

module.exports = LoginForm;
