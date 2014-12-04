var config = require('../../config/localConfig.json');

Parse.initialize(config.parseApplicationId, config.parseJSKey);

module.exports = Parse;