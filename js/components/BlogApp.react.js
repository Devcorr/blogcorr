/**
 * @jsx React.DOM
 */

var Header = require('./Header.react');
var React = require('react');
var BlogPost = require('./BlogPost.react');
var BlogPostStore = require('../stores/BlogPostStore');
var CreatePostForm = require('./CreatePostForm.react');

function getBlogState() {
    return {
        allPosts: BlogPostStore.getAll()
    }
}

var BlogApp = React.createClass({

    getInitialState: function() {
        return getBlogState();
    },

    componentDidMount: function() {
        BlogPostStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BlogPostStore.removeChangeListener(this._onChange);
    },

    render: function() {

        var allBlogPosts = this.state.allPosts;
        var posts = [];

        for (var i=0; i < allBlogPosts.length; i++) {
          posts.push(<BlogPost post={allBlogPosts.at(i)} />);
        }

        return (
            <div>
                <Header />
                <section className="container">{posts}</section>
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

module.exports = BlogApp;
