/**
 * @jsx React.DOM
 */

var React = require('react');
var LoginForm = require('./LoginForm.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header className="main" id="header">
          <h1 id="headerLogo">Blogcorr</h1>
          <LoginForm />
      </header>
    );
  }

});

module.exports = Header;
