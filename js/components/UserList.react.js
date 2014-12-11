/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('underscore');
var UserStore = require('../stores/UserStore');
var UserListItem  = require('./UserListItem.react');

var UserList = React.createClass({

    getInitialState: function() {
        return {
            users: UserStore.getAllUsers()
        }
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <table>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                {_.map(this.state.users, function(user) { return <UserListItem user={user} />} )}
            </table>
        )

    },

    _onChange: function() {
        this.setState({
            users: UserStore.getAllUsers()
        });
    }

});

module.exports = UserList;
