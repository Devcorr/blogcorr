

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

Parse.initialize("Xwe7s8Ug2BqooogeIZSq1XnwT4YApw72m6huvLpJ", "Fnz4uu0G5y8foFzX4WGgZHfMVJGUa83ywFUo3EiV");

var BlogPost = Parse.Object.extend("Post");
var BlogPostCollection = Parse.Collection.extend({
    model: BlogPost
});
var blogPostCollection = new BlogPostCollection();
var _blogPosts = {};

var BlogPostStore = merge(EventEmitter.prototype, {

    /**
     * Get the entire collection of blog posts.
     * @return {object}
     */
    getAll: function () {
        return _blogPosts;
    }
});

module.exports = TodoStore;
