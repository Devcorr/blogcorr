/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @jsx React.DOM
 */

var React = require('react');
var BlogApp = require('./components/BlogApp.react');

Parse.initialize("Xwe7s8Ug2BqooogeIZSq1XnwT4YApw72m6huvLpJ", "Fnz4uu0G5y8foFzX4WGgZHfMVJGUa83ywFUo3EiV");

React.renderComponent(
    <BlogApp />,
    document.getElementById('blogapp')
);
