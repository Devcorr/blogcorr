var AppDispatcher = require('../dispatcher/AppDispatcher');

var BlogPostActions = {
    create: function(title, text) {
        AppDispatcher.handleViewAction({
            actionType: "create",
            title: title,
            text: text
        });
    }
};

module.exports = BlogPostActions;
