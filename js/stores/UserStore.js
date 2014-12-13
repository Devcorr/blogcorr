var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Parse = require('../util/Parse');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var currentUserRoles, userCollection, userCollectionQuery, roleCollection, roles;

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

userCollectionQuery = new Parse.Query(Parse.User);
userCollection = userCollectionQuery.collection();

userCollection.fetch({
    success: function() {
        UserStore.emitChange();
    },
    error: function () {
        alert("Something went wrong with loading the users");
    }
});

roleCollectionQuery = new Parse.Query(Parse.Role);
roleCollection = roleCollectionQuery.collection();

roleCollection.fetch({
    success: function() {
        UserStore.emitChange();
        roles = roleCollection.toJSON();
        _.each(roles, function(role) {
            roleCollection
                .get(role.objectId)
                .relation("users")
                .query()
                .find({
                    success: function(users) {
                        role.users = _.map(users, function(user) {
                            return user.toJSON();
                        });
                        UserStore.emitChange();
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
        });
    },
    error: function(collection, error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});


var UserStore = _.extend(EventEmitter.prototype, {

    getAllUsers: function() {
        return userCollection.toJSON();
    },

    getCurrentUser: function() {
        return Parse.User.current();
    },

    currentUserHasRole: function(roleName) {
        return _.contains(currentUserRoles, roleName);
    },

    getRolesForUser: function(userId) {
        return _.filter(roles, function(role) {
            return _.some(role.users, function(user) {
                return user.objectId === userId;
            });
        });
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
