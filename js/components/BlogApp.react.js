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
var DocumentTitle = require('react-document-title');

var BlogPost = require('./BlogPost.react');
var LoginForm = require('./LoginForm.react');
var BlogPostList = require('./BlogPostList.react');
var UserList = require('./UserList.react');
var UserStore = require('../stores/UserStore');
var NotFound = require('./NotFound.react');
var analytics = require('../util/analytics');

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
            <DocumentTitle title="Devcorr Technologies">
                <div>
                    <header className="main" id="header">
                        <h1 id="headerLogo">
                            <Link to="blogapp">
                                <img src="/images/retinaBlogLogo.png" height="46" alt="Devcorr" />
                            </Link>
                        </h1>
                        <LoginForm />
                    </header>

                    <section className="container">
                        <this.props.activeRouteHandler/>
                    </section>
                </div>
            </DocumentTitle>
        );
    },

    _onChange: function() {
        this.setState({
            user: UserStore.getCurrentUser()
        });
    }

});

var routes = (
    <Routes location="history" onChange={analytics.onPageChange}>
        <Route name="blogapp" path="/" handler={BlogApp}>
            <Route name="posts" path="posts/:postId" handler={BlogPost}/>
            <Route name="users" path="users" handler={UserList}/>
            <DefaultRoute handler={BlogPostList}/>
            <NotFoundRoute handler={NotFound} />
        </Route>
    </Routes>
);

module.exports = routes;
