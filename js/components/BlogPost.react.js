/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var BlogPostActions = require("../actions/BlogPostActions");
var UserStore = require("../stores/UserStore");
var BlogPostStore = require("../stores/BlogPostStore");

var cx = require('react/lib/cx');

var BlogPost = React.createClass({

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
        var dateElement, titleInput, textInput, deleteButton;
        var post = this.getPost();

        if (post) {
            dateElement = post.createdAt ? <p className="date">{post.createdAt.toDateString()}</p> : "";

            if (this.state.isEditingTitle) {
                titleInput = <input
                                className="titleEdit"
                                onBlur={this._onSaveTitle}
                                onChange={this._onChangeTitle}
                                value={this.state.titleValue}
                                ref="titleEdit"
                                autoFocus={true}
                                value={this.state.titleValue}
                             />
            }

            if (this.state.isEditingText) {
                textInput = <textarea
                                className="textEdit"
                                onBlur={this._onSaveText}
                                onChange={this._onChangeText}
                                value={this.state.textValue}
                                ref="textEdit"
                                autoFocus={true}
                                value={this.state.textValue}
                             >
                             </textarea>
            }

            if (UserStore.currentUserHasRole("Author")) {
                deleteButton = <p className="deletePost">
                                   <a href="#" onClick={this._deletePost}>Delete</a>
                               </p>
            }

            return (
                <article className="type-system-sans">
                    <h1 className={cx({
                        'editing': this.state.isEditingTitle
                    })}
                    onDoubleClick={this._onTitleDoubleClick}>
                        {post.get("title")}
                    </h1>
                    {titleInput}
                    {dateElement}
                    <p className={cx({
                        'editing': this.state.isEditingText
                    })}
                       onDoubleClick={this._onTextDoubleClick}>{post.get("text")}
                    </p>
                    {textInput}
                    <Link to="posts" params={{postId: post.id}}>Read More</Link>
                    {deleteButton}
                </article>
            );
        } else {
            return (<div></div>);
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
        if (UserStore.currentUserHasRole("Author")) {
            this.setState({
                isEditingTitle: true
            });
        }
    },

    _onTextDoubleClick: function () {
        if (UserStore.currentUserHasRole("Author")) {
            this.setState({
                isEditingText: true
            });
        }
    },

    _deletePost: function(e) {
        e.preventDefault();
        BlogPostActions.delete(this.getPost());
    },

    _onChangePost: function() {
        var post = this.getPost();
        this.setState({
            titleValue: post.get("title"),
            textValue: post.get("text")
        });
    }

});

module.exports = BlogPost;
