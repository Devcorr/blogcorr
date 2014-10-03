/**
 * @jsx React.DOM
 */

var Header = require('./Header.react');
var React = require('react');
var BlogPost = require('./BlogPost.react');
var BlogPostStore = require('../stores/BlogPostStore');

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



        return (
            <div>
                <Header />
                <BlogPost post={this.state.allPosts.at(0)} />
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