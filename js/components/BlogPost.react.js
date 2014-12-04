/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Navigation = require('react-router').Navigation;
var Link = Router.Link;
var DocumentTitle = require('react-document-title');

var NotFound = require("./NotFound.react");
var BlogPostActions = require("../actions/BlogPostActions");
var UserStore = require("../stores/UserStore");
var BlogPostStore = require("../stores/BlogPostStore");

var cx = require('react/lib/cx');

var BlogPost = React.createClass({
    mixins: [Navigation],

    getPost: function() {
        if (this.props.post) {
            post = this.props.post;
        } else if (this.props.params.postId) {
            post = BlogPostStore.getPost(this.props.params.postId);
        } else {
            post = null;
            // Implement 404
        }
        return post;
    },

    viewingSinglePost: function() {
        return (this.props.params && this.props.params.postId);
    },

    isEditable: function() {
        return (this.viewingSinglePost() && UserStore.currentUserHasRole("Author"));
    },

    getInitialState: function() {
        var post = this.getPost();

        return {
            isEditingTitle: false,
            isEditingText: false,
            titleValue: post ? post.get("title") : "",
            textValue: post ? post.get("text") : ""
        };
    },

    componentDidMount: function() {
        BlogPostStore.addChangeListener(this._onChangePost);
    },

    componentWillUnmount: function() {
        BlogPostStore.removeChangeListener(this._onChangePost);
    },

    render: function() {
        var dateElement, titleElement, titleInput, textInput, deleteButton, doubleClick;
        var post = this.getPost();

        if (post) {
            dateElement = post.createdAt ? <p className="date">{post.createdAt.toDateString()}</p> : "";

            if (this.isEditable() && this.state.isEditingTitle) {
                titleInput =
                    <input
                        className="titleEdit"
                        onBlur={this._onSaveTitle}
                        onChange={this._onChangeTitle}
                        value={this.state.titleValue}
                        ref="titleEdit"
                        autoFocus={true}
                        value={this.state.titleValue}
                     />;
            }

            if (this.isEditable() && this.state.isEditingText) {
                textInput =
                    <textarea
                        className="textEdit"
                        onBlur={this._onSaveText}
                        onChange={this._onChangeText}
                        value={this.state.textValue}
                        ref="textEdit"
                        autoFocus={true}
                        value={this.state.textValue}
                        rows="10"
                    >
                    </textarea>;
            }

            if (this.isEditable()) {
                deleteButton =
                    <p className="deletePost">
                        <a href="#" onClick={this._deletePost}>Delete</a>
                    </p>;
            }

            if (this.viewingSinglePost()) {
                titleElement = post.get("title");
            }
            else {
                titleElement =
                    <Link to="posts" params={{postId: post.id}}>
                                   {post.get("title")}
                    </Link>;
            }

            var article = (
                <article className="type-system-sans">
                    <h1
                        className={cx({
                            'editing': this.state.isEditingTitle
                        })}
                        onDoubleClick={this._onTitleDoubleClick}
                    >
                        {titleElement}
                    </h1>
                    {titleInput}
                    {dateElement}
                    <p
                        className={cx({
                            'editing': this.state.isEditingText
                        })}
                        onDoubleClick={this._onTextDoubleClick}
                    >
                        {post.get("text")}
                    </p>
                    <hr/>
                    <p className="author">
                        {post.get("author").get("username")}
                    </p>
                    {textInput}
                    {deleteButton}
                </article>
            );

            if (this.props.params && this.props.params.postId) {
                article = (
                    <DocumentTitle title={"Devcorr Technologies - " + post.get("title")}>
                        {article}
                    </DocumentTitle>
                )
            }

            return article;

        } else {
            return <NotFound />;
        }
    },

    _onChangeTitle: function() {
        this.setState({
            titleValue: this.refs.titleEdit.getDOMNode().value
        });
    },

    _onChangeText: function() {
        this.setState({
            textValue: this.refs.textEdit.getDOMNode().value
        });
    },

    _onSaveTitle: function() {
        BlogPostActions.update(this.getPost(), {
            title: this.state.titleValue
        });

        this.setState({
            isEditingTitle: false
        });
    },

    _onSaveText: function() {
        BlogPostActions.update(this.getPost(), {
            text: this.state.textValue
        });

        this.setState({
            isEditingText: false
        });
    },

    _onTitleDoubleClick: function() {
        if (this.isEditable()) {
            this.setState({
                isEditingTitle: true
            });
        }
    },

    _onTextDoubleClick: function () {
        if (this.isEditable()) {
            this.setState({
                isEditingText: true
            });
        }
    },

    _deletePost: function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this post?") === true) {
            BlogPostActions.delete(this.getPost());
            this.transitionTo('blogapp');
        }
    },

    _onChangePost: function() {
        var post = this.getPost();
        if (this.isMounted()) {
            this.setState({
                titleValue: post.get("title"),
                textValue: post.get("text")
            });
        }
    }

});

module.exports = BlogPost;
