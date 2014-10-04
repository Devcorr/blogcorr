/**
 * @jsx React.DOM
 */

var React = require('react');

var BlogPost = React.createClass({

    render: function() {
        var post = this.props.post;
        var dateElement = post.createdAt ?
            <p className="date">{post.createdAt.toDateString()}</p> : "";

        if (post) {
            return (
                <article className="type-system-sans">
                    <h1>
                        {post.get("title")}
                    </h1>
                    {dateElement}
                    <p>{post.get("text")}</p>
                </article>
            );
        } else {
            return (<div></div>);
        }
    }
});

module.exports = BlogPost;
