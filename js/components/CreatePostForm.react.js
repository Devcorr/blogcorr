/**
 * @jsx React.DOM
 */

var React = require('react');
var BlogPostActions = require('../actions/BlogPostActions');

var CreatePostForm = React.createClass({
    render: function() {
        return (
          <form onSubmit={this._save}>
                <input ref="title" type="text"/>
                <textarea ref="text"></textarea>
                <input type="submit"/>
            </form>
        );
    },

    _save: function(event) {
        event.preventDefault();
        var title = this.refs.title.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        BlogPostActions.create(title, text);
    }
});


module.exports = CreatePostForm;
