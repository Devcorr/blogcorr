/**
 * @jsx React.DOM
 */

var React = require('react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header className="main" id="header">
          <h1>Blogcorr</h1>
      </header>
    );
  }

});

module.exports = Header;
