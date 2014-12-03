var Parse = require("parse").Parse;
var _ = require('underscore');
var config = require('../config/localConfig.json');

Parse.initialize(config.parseApplicationKey, config.parseJSKey);


// User setup

var initUsers = function () {
    var usersToCreate = [{
        username: 'Matt',
        password: 'test',
        email: 'matt@devcorr.com'
    }, {
        username: 'Joe',
        password: 'test',
        email: 'joe@devcorr.com'
    }, {
        username: 'Travis',
        password: 'test',
        email: 'travis@devcorr.com'
    }];

    var createUser = function(user, callback) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", user.username);
        query.first({
            success: function(parseUser) {
                if (parseUser) {
                    console.log(parseUser.get("username") + " has already been created, skipping");
                    callback();
                }
                else {
                    parseUser = new Parse.User();
                    parseUser.set("username", user.username);
                    parseUser.set("password", user.password);
                    parseUser.set("email", user.email);

                    parseUser.signUp(null, {
                        success: function(user) {
                            console.log(user.get("username") + " Created Successfully");
                            callback();
                        },
                        error: function(user, error) {
                            console.log("Error: " + error.code + " " + error.message);
                            callback();
                        }
                    });
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
                callback();
            }
        });
    };

    return function createUsers() {
        if (usersToCreate.length !== 0) {
            createUser(_.first(usersToCreate), createUsers);
            usersToCreate = _.rest(usersToCreate);
        } else {
            initRoles();
        }
    }
}()();

// End user setup


// Role Setup
var initRoles = function () {
    var roleQuery = new Parse.Query(Parse.Role);
    roleQuery.equalTo("name", "Author");
    roleQuery.first({
        success: function (role) {
            var authorsQuery;
            if (role) {
                console.log("Author role already created, skipping");
            } else {
                authorsQuery = new Parse.Query(Parse.User);
                authorsQuery.find({
                    success: function (results) {
                        var roleACL = new Parse.ACL();
                        roleACL.setPublicReadAccess(true);
                        var role = new Parse.Role("Author", roleACL);
                        role.getUsers().add(results);
                        role.save(null, {
                            success: function (role) {
                                console.log("Author role created successfully");
                            },
                            error: function (role, error) {
                                console.log("Error: " + error.code + " " + error.message);
                            }
                        });
                    },
                    error: function (error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
            }

        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
};
// End role setup

// Initilize BlogPost class and data
Parse.User.logIn("Matt", "test", {
    success: function (user) {
        var BlogPost = Parse.Object.extend("BlogPost");

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
                    blogPost.set("author", user);

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
    },
    error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
    }
});


// End BlogPost initialization

