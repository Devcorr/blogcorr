/**
 * @jsx React.DOM
 */

var React = require('react');
var BlogPostStore = require('../stores/BlogPostStore');
var UserStore = require('../stores/UserStore');
var CreatePostForm = require('./CreatePostForm.react');
var BlogPost = require('./BlogPost.react');

function getBlogState() {
    return {
        allPosts: BlogPostStore.getAll(),
        user: UserStore.getCurrentUser()
    }
}

var BlogPostList = React.createClass({

    getInitialState: function() {
        return getBlogState();
    },

    componentDidMount: function() {
        BlogPostStore.addChangeListener(this._onChange);
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BlogPostStore.removeChangeListener(this._onChange);
        UserStore.removeChangeListener(this._onChange);
    },


    render: function() {

        var allBlogPosts = this.state.allPosts;
        var posts = [];

        for (var i=0; i < allBlogPosts.length; i++) {
            posts.push(<BlogPost post={allBlogPosts.at(i)} />);
        }

        return (
            <div>
                {posts}
                <CreatePostForm />
            </div>
            );
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getBlogState());
    }


});

module.exports = BlogPostList;
