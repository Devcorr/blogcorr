
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

var parseAdaptor = require('cloud/prerender-parse.js');
var config = require('cloud/config.js');

app.use(require('cloud/prerenderio.js').setAdaptor(parseAdaptor(Parse)).set('prerenderToken',config.prerenderToken));

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.get('/post/:id/:name', function(req, res) {
    var query;
    var mappings = {
        'why-i-cant-sleep': "Why I Can't Sleep",
        'meet-devcorr': "Meet Devcorr",
        'its-just-an-mvp': "It's Just an MVP",
        'try-fail-learn-repeat': "Try. Fail. Learn. Repeat.",
        'testing-with-cucumber-in-the-java-ecosystem': "Testing with Cucumber in the Java Ecosystem",
        'git-commits-on-osx-there-was-a-problem-with-the': "Git Commits on OSX: There was a problem with the editor 'vi'",
        'adventures-in-appleland-xcode-5': "Adventures in Appleland: xcode 5",
        'compiling-sass-or-less-on-the-fly-with-intellij': "Compiling Sass (or LESS) on the fly with IntelliJ",
        '2013': "2013 { … }",
        'cyclecorr-2014': "Cyclecorr 2014"
    };

    if (mappings.hasOwnProperty(req.params.name)) {
        query = new Parse.Query("BlogPost");
        query.equalTo("title", mappings[req.params.name]);
        query.first({
            success: function(post) {
                res.redirect(301, '/posts/' + post.id);
            },
            error: function(error) {
                console.error("Got an error " + error.code + " : " + error.message);
            }
        })
    }

});

app.get('/*', function(req, res) {
    res.render('index');
});

// Attach the Express app to Cloud Code.
app.listen();
