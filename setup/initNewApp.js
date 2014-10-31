var Parse = require("parse").Parse;

Parse.initialize("rwgIYeyFxonhJEyLWAyTcZWxpX73GS0cJMu8EaDi", "KfgMguvowWMFIIqz3OerGz84c40l6i98PtkRUL4o");

var BlogPost = Parse.Object.extend("BlogPost");

// Initilize BlogPost class and data
var firstPostQuery = new Parse.Query(BlogPost);
firstPostQuery.equalTo("title", "First Post!");

firstPostQuery.find({
    success: function(results) {
        var blogPost;

        if (results.length) {
            console.log("First post already initialized, skipping.");
        } else {
            blogPost = new BlogPost();
            blogPost.set("title", "First Post!");
            blogPost.set("text", "We are a software development shop and boutique consulting firm specializing in web and mobile applications. Devcorr leverages decades worth of combined development experience to deliver custom software solutions.");

            blogPost.save(null, {
                success: function(blogPost) {
                    console.log("blogPost created successfully: " + blogPost.id);
                },
                error: function(blogPost, error) {
                    console.log("Failed to create new blogPost, with error code: " + error.message);
                }
            });
        }
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});

// End BlogPost initialization


