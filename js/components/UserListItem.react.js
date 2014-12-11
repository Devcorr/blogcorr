/**
 * @jsx React.DOM
 */

var React = require('react');

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
            </tr>
        );
    }
});

module.exports = UserListItem;
