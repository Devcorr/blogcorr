/**
 * @jsx React.DOM
 */

var React = require('react');
var Select = require('react-select');
var _ = require('underscore');
var UserStore = require('../stores/UserStore');

var UserListItem = React.createClass({

    render: function() {
        var userRoles = UserStore.getRolesForUser(this.props.user.objectId)
        var roleOptions = _.map(userRoles, function(role) {
            return {
                value: role.objectId,
                label: role.name
            }
        });

        return (
            <tr>
                <td>
                    {this.props.user.username}
                </td>
                <td>
                    {this.props.user.email}
                </td>
                <td>
                    ******
                </td>
                <td>
                    <Select
                        name="user-roles"
                        value={_.pluck(userRoles, "objectId").join(",")}
                        options={roleOptions}
                        multi={true}
                    />
                </td>
            </tr>
        );
    }
});

module.exports = UserListItem;
