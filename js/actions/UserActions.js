var AppDispatcher = require('../dispatcher/AppDispatcher');

var UserActions = {
    logIn: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: "login",
            username: username,
            password: password
        });
    },
    logOut: function() {
        AppDispatcher.handleViewAction({
            actionType: "logout"
        });
    }
};

module.exports = UserActions;
