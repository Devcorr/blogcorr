/**
 * @jsx React.DOM
 */

var React = require('react');
var BlogPost = require('./BlogPost.react');
var BlogPostStore = require('../stores/BlogPostStore');
var CreatePostForm = require('./CreatePostForm.react');
var UserStore = require('../stores/UserStore');
var LoginForm = require('./LoginForm.react');

function getBlogState() {
    return {
        allPosts: BlogPostStore.getAll(),
        user: UserStore.getCurrentUser()
    }
}

var BlogApp = React.createClass({

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
                <header className="main" id="header">
                    <h1 id="headerLogo"><img src="images/logo.png" alt="Devcorr" /></h1>
                    <LoginForm />
                </header>

                <this.props.activeRouteHandler/>

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

var routes = (
    <Routes location="history">
        <Route name="blogapp" path"/" handler={BlogApp}>
            <DefaultRoute handler={}
    </Routes>
    )

module.exports = BlogApp;
