/**
 * @jsx React.DOM
 */

var React = require('react');

var NotFound = React.createClass({

    render: function() {
        return (
            <div>
                <p className="notFoundMessage">Whooops! I can't find what you're looking for.</p>
            </div>
        )
    }

});

module.exports = NotFound;

