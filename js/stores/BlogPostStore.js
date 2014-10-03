var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

Parse.initialize("Xwe7s8Ug2BqooogeIZSq1XnwT4YApw72m6huvLpJ", "Fnz4uu0G5y8foFzX4WGgZHfMVJGUa83ywFUo3EiV");

var BlogPost = Parse.Object.extend("BlogPost");
var BlogPostCollection = Parse.Collection.extend({
    model: BlogPost
});
var blogPostCollection = new BlogPostCollection();
blogPostCollection.fetch({
    success: function() {
        BlogPostStore.emitChange();
    },
    error: function () {
        alert("Something went wrong with loading the posts");
    }
});

var BlogPostStore = merge(EventEmitter.prototype, {

    /**
     * Get the entire collection of blog posts.
     * @return {object}
     */
    getAll: function () {
        return blogPostCollection;
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
      case 'create':
          text = action.text.trim();
          title = action.title.trim();
          if (text !== '' && title !== '') {
              blogPostCollection.create({
                  title: title,
                  text: text
              });
          }
          break;

      default:
          return true;
  }

  BlogPostStore.emitChange();

  return true;
});

module.exports = BlogPostStore;
