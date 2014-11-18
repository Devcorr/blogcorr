/* @flow */

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var merge = require('react/lib/merge');
var Parse = require('../util/parse');

var CHANGE_EVENT = 'change';

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

    getPost: function (postId: string) {
        return blogPostCollection.get(postId);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback: Function) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback: Function) {
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
                  text: text
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
