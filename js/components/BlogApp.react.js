/**
 * @jsx React.DOM
 */

var Header = require('./Header.react');
var React = require('react');

var BlogApp = React.createClass({

    render: function() {
        return (
            <div>
                <Header />
            </div>
        );
    }

});

module.exports = BlogApp;