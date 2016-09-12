const Tools = require('./tools.js');

module.exports = {
    importFromProvider: function (request, reply) {
        Tools.getJsonFromFile(request.payload).then(function(response) {
            reply(response);
        }, function(err) {
            reply(err);
        });
    }
};