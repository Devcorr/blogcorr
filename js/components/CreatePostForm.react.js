/**
 * @jsx React.DOM
 */

var React = require('react');
var BlogPostActions = require('../actions/BlogPostActions');
var UserStore = require('../stores/UserStore');

var CreatePostForm = React.createClass({

    getInitialState: function() {
        return {
            titleValue: this.props.titleValue || '',
            textValue: this.props.textValue || ''
        }
    },

    render: function() {

        var user = UserStore.getCurrentUser(),
            userIsAuthor = UserStore.currentUserHasRole("Author");

        if (user && userIsAuthor) {
            return (
                <section className="container">
                    <form onSubmit={this._save}>
                        <input
                        placeholder="Title"
                        ref="title"
                        type="text"
                        value={this.state.titleValue}
                        onChange={this._onChange}
                        />
                        <textarea
                        placeholder="Content"
                        ref="text"
                        value={this.state.textValue}
                        onChange={this._onChange}>
                        </textarea>
                        <input type="submit"/>
                    </form>
                </section>
            );
        } else {
            return false;
        }

    },

    _save: function(event) {
        event.preventDefault();

        BlogPostActions.create(this.state.titleValue, this.state.textValue);

        this.setState({
            titleValue: "",
            textValue: ""
        });
    },

    /**
     * @param {object} event
     */
    _onChange: function(/*object*/ event) {
        this.setState({
            titleValue: this.refs.title.getDOMNode().value,
            textValue: this.refs.text.getDOMNode().value
        });
    }
});


module.exports = CreatePostForm;
