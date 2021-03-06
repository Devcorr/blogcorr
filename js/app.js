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
var routes = require('./components/BlogApp.react');
var Router = require('react-router');
var analytics = require('./util/analytics');

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    analytics.onPageChange(state.path);
    React.render(<Handler/>, document.getElementById('blogapp'));
});