var analytics = {
    // To be used with React Router's "onChange" event
    onPageChange: function() {
        ga('set', 'page', this.getCurrentPath());
        ga('send', 'pageview');
    }
}

module.exports = analytics;