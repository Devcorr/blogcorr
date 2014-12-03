var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');
var Parse = require('../util/Parse');

var CHANGE_EVENT = 'change';

var BlogPost = Parse.Object.extend("BlogPost");

var postCollectionQuery = new Parse.Query(BlogPost);
postCollectionQuery.include("author");
var blogPostCollection = postCollectionQuery.collection();

blogPostCollection.comparator = function(object) {
    return object.createdAt.getTime() * -1;
};

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

    getPost: function (postId) {
        return blogPostCollection.get(postId);
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
          var text = action.text.trim();
          var title = action.title.trim();
          if (text !== '' && title !== '') {
              blogPostCollection.create({
                  title: title,
                  text: text,
                  author: Parse.User.current()
              }, {
                  wait: true,
                  success: function(post) {
                      BlogPostStore.emitChange();
                  },
                  error: function(post, error) {
                      alert("Something bad happened while creating the post");
                  }
              });
          }
          break;

      case 'update':
          var post = action.post;
          var updates = action.updates;

          post.save(updates, {
              success: function(post) {
                  BlogPostStore.emitChange();
              },
              error: function(post, error) {
                  alert("Something bad happened while updating the post");
              }
          });
          break;

      case 'delete':
          var post = action.post;

          post.destroy({
              success: function() {
                  BlogPostStore.emitChange();
              },
              error: function() {
                  alert("Something went wrong while deleting the post");
              }
          })
          break;

      default:
          return true;
  }

  return true;
});

module.exports = BlogPostStore;
