var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');
var Parse = require('../util/Parse');

var CHANGE_EVENT = 'change';

var UserStore = merge(EventEmitter.prototype, {

    getCurrentUser: function() {
        return Parse.User.current();
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
                        UserStore.emitChange();
                    },
                    error: function(user, error) {
                        alert("something went wrong with the login");
                    }
                });
            }
            break;

        case 'logout':
            Parse.User.logOut();
            UserStore.emitChange();
            break;

        default:
            return true;
    }

    return true;
});

module.exports = UserStore;
