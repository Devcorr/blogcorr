
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

var parseAdaptor = require('cloud/prerender-parse.js');

app.use(require('cloud/prerenderio.js').setAdaptor(parseAdaptor(Parse)).set('prerenderToken','7j6LRBDmyZ8FlIfPzpTc'));

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.get('/*', function(req, res) {
    res.render('index');
});

// Attach the Express app to Cloud Code.
app.listen();
