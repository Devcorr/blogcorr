/* @flow */

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');
var Parse = require('../util/parse');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var currentUserRoles;
var loadCurrentUserRoles = function() {
    var query = new Parse.Query(Parse.Role);
    query.equalTo("users", Parse.User.current());
    query.find({
        success: function (results) {
            currentUserRoles = _.map(results, function (role) {
                return role.get("name");
            });
            UserStore.emitChange();
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
};

var UserStore = merge(EventEmitter.prototype, {

    getCurrentUser: function() {
        return Parse.User.current();
    },

    currentUserHasRole: function(roleName) {
        return _.contains(currentUserRoles, roleName);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'login':
            var username = action.username.trim();
            var password = action.password.trim();

            if (username !== '' && password !== '') {
                Parse.User.logIn(username, password, {
                    success: function(user) {
                        loadCurrentUserRoles();
                    },
                    error: function(user, error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }
            break;

        case 'logout':
            Parse.User.logOut();
            currentUserRoles = undefined;
            UserStore.emitChange();
            break;

        default:
            return true;
    }

    return true;
});

if (UserStore.getCurrentUser()) {
    loadCurrentUserRoles();
}

module.exports = UserStore;
