var AppDispatcher = require('../dispatcher/AppDispatcher');

var BlogPostActions = {
    create: function(title, text) {
        AppDispatcher.handleViewAction({
            actionType: "create",
            title: title,
            text: text
        });
    },

    update: function(post, updates) {
        AppDispatcher.handleViewAction({
            actionType: "update",
            post: post,
            updates: updates
        });
    },

    delete: function(post) {
        AppDispatcher.handleViewAction({
            actionType: "delete",
            post: post
        });
    }
};

module.exports = BlogPostActions;
