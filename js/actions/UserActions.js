var AppDispatcher = require('../dispatcher/AppDispatcher');

var UserActions = {
    logIn: function(username, password) {
        AppDispatcher.handleViewAction({
            actionType: "login",
            username: username,
            password: password
        });
    }
};

module.exports = UserActions;
