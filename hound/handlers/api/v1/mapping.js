const Tools = require('./tools.js');

module.exports = {
    extractHeaders: function (request, reply) {
        Tools.getJsonFromFile(request.payload).then(function(response) {
            reply(Object.keys(response[0]));
        }, function(err) {
            reply(err);
        });
    },
    createMapping: function (request, reply) {
        reply(request.payload);
    } 
};