var config = require('../../config/localConfig.json');

Parse.initialize(config.parseApplicationKey, config.parseJSKey);

module.exports = Parse;