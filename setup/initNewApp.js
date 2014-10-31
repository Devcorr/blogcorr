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

// User setup
var matt, joe, travis;
var query = new Parse.Query(Parse.User);

query.equalTo("username", "Bargs");
query.first({
    success: function(user) {
        if (user) {
            matt = user;
            console.log("Matt has already been created, skipping");
        }
        else {
            matt = new Parse.User();
            matt.set("username", "Bargs");
            matt.set("password", "test");
            matt.set("email", "matt@devcorr.com");

            matt.signUp(null, {
                success: function(user) {
                    console.log("Matt Created Successfully");
                },
                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
    },
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});

query.equalTo("username", "Joe");
query.first({
    success: function(user) {
        if (user) {
            joe = user;
            console.log("Joe has already been created, skipping");
        }
        else {
            joe = new Parse.User();
            joe.set("username", "Joe");
            joe.set("password", "test");
            joe.set("email", "joe@devcorr.com");

            joe.signUp(null, {
                success: function(user) {
                    console.log("Joe Created Successfully");
                },
                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
    },
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});

query.equalTo("username", "Travis");
query.first({
    success: function(user) {
        if (user) {
            travis = user;
            console.log("Travis has already been created, skipping");
        }
        else {
            travis = new Parse.User();
            travis.set("username", "Travis");
            travis.set("password", "test");
            travis.set("email", "travis@devcorr.com");

            travis.signUp(null, {
                success: function(user) {
                    console.log("Travis Created Successfully");
                },
                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
    },
    error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
    }
});

// End user setup


// Role Setup
var roleQuery = new Parse.Query(Parse.Role);
roleQuery.equalTo("name", "Author");
roleQuery.first({
    success: function(role) {
        var authorsQuery;
        if (role) {
            console.log("Author role already created, skipping");
        } else {
            authorsQuery = new Parse.Query(Parse.User);
            authorsQuery.find({
                success: function(results) {
                    var roleACL = new Parse.ACL();
                    roleACL.setPublicReadAccess(true);
                    var role = new Parse.Role("Author", roleACL);
                    role.getUsers().add(results);
                    role.save(null, {
                        success: function(role) {
                            console.log("Author role created successfully");
                        },
                        error: function(role, error) {
                            console.log("Error: " + error.code + " " + error.message);
                        }
                    });
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});

// End role setup
