/**
 * @jsx React.DOM
 */

var React = require('react');

var BlogPost = React.createClass({

    render: function() {

        var post = this.props.post;

        if (post) {
            return (
                <div>
                    <div>
                        {post.get("title")}
                    </div>
                    <div>
                        {post.get("text")}
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
});

module.exports = BlogPost;
