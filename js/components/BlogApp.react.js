/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var BlogPost = require('./BlogPost.react');
var LoginForm = require('./LoginForm.react');
var BlogPostList = require('./BlogPostList.react');
var UserStore = require('../stores/UserStore');

var BlogApp = React.createClass({

    getInitialState: function() {
        return {
            user: UserStore.getCurrentUser()
        }
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <header className="main" id="header">
                    <h1 id="headerLogo">
                        <Link to="blogapp">
                            <img src="/images/logo.png" alt="Devcorr" />
                        </Link>
                    </h1>
                    <LoginForm />
                </header>

                <section className="container">
                    <this.props.activeRouteHandler/>
                </section>
            </div>
        );
    },

    _onChange: function() {
        this.setState({
            user: UserStore.getCurrentUser()
        });
    }

});

var routes = (
    <Routes location="history">
        <Route name="blogapp" path="/" handler={BlogApp}>
            <Route name="posts" path="posts/:postId" handler={BlogPost}/>
            <DefaultRoute handler={BlogPostList}/>
        </Route>
    </Routes>
);

module.exports = routes;
