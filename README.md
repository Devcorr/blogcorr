Uses [Flux](http://facebook.github.io/flux), [React](http://facebook.github.io/react), and [Parse](https://www.parse.com/) to create a single page blogging platform.

Setting up a new dev environment requires the following steps:

1. Create a new Parse app.
2. Clone this repo.
3. Install the parse CLI.
4. Manually create a config directory at the project root `mkdir config`.
5. Create two local config files: localConfig.json and secrets.json. (these should remain outside of version control,
    examples of what they should look like are in the setup/templates folder.
6. Run `gulp init` to generate app config files based on your unique local config
7. Run the `initNewApp.js` script with Node to set up the schema and test data in your new Parse app.
8. Manually set the class level permissions in the Parse dashboard.
9. Run `parse deploy dev` to upload all of the hosted files to your Parse app.
10. Go to Settings -> Hosting in the Parse dashboard and set your ParseApp name.

Now your dev environment should be up and running! Test it by browsing to <your ParseApp name>.parseapp.com.

