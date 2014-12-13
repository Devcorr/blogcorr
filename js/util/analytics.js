var analytics = {
    // To be used with React Router's "onChange" event
    onPageChange: function(path) {
        ga('set', 'page', path);
        ga('send', 'pageview');
    }
}

module.exports = analytics;