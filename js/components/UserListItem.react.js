/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('underscore');
var UserStore = require('../stores/UserStore');

var UserListItem = React.createClass({

    render: function() {
        return (
            <tr>
                <td>
                    {this.props.user.username}
                </td>
                <td>
                    {this.props.user.email}
                </td>
                <td>
                    {_.pluck(UserStore.getRolesForUser(this.props.user.objectId), "name")}
                </td>
            </tr>
        );
    }
});

module.exports = UserListItem;
