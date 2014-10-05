var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var UserStore = merge(EventEmitter.prototype, {

    getCurrentUser: function() {

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

            break;

        default:
            return true;
    }

    BlogPostStore.emitChange();

    return true;
});

module.exports = UserStore;
