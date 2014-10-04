/**
 * @jsx React.DOM
 */

var React = require('react');

var BlogPost = React.createClass({

    render: function() {

        var post = this.props.post;

        if (post) {
            return (
                <article className="type-system-sans">
                    <h1>
                        {post.get("title")}
                    </h1>
                    <p className="date">{post.createdAt}</p>
                    <p>{post.get("text")}</p>
                </article>
            );
        } else {
            return (<div></div>);
        }
    }
});

module.exports = BlogPost;
