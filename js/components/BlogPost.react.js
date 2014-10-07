/**
 * @jsx React.DOM
 */

var React = require('react');
var BlogPostActions = require("../actions/BlogPostActions");

var cx = require('react/lib/cx');

var BlogPost = React.createClass({

    getInitialState: function() {
        return {
            isEditingTitle: false,
            isEditingText: false,
            titleValue: this.props.post.get("title"),
            textValue: this.props.post.get("text")
        };
    },

    render: function() {
        var post = this.props.post;
        var dateElement = post.createdAt ?
            <p className="date">{post.createdAt.toDateString()}</p> : "";
        var titleInput, textInput;

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

        if (post) {
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
                    <p className="deletePost"><a href="#" onClick={this._deletePost}>Delete</a></p>
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
        BlogPostActions.update(this.props.post, {
                title: this.state.titleValue
        });

        this.setState({
            isEditingTitle: false,
        });
    },

    _onSaveText: function() {
        BlogPostActions.update(this.props.post, {
            text: this.state.textValue
        });

        this.setState({
            isEditingText: false,
        });
    },

    _onTitleDoubleClick: function() {
        this.setState({
            isEditingTitle: true
        });
    },

    _onTextDoubleClick: function () {
        this.setState({
            isEditingText: true
        });
    },

    _deletePost: function(e) {
        e.preventDefault();
        BlogPostActions.delete(this.props.post)
    }

});

module.exports = BlogPost;
