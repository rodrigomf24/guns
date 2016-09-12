const HoundReader = require('./../../../modules/CsvReader.js');
const HoundTools = require('./../../../modules/Tools.js');

const getJsonFromFile = function(payload) {
	return new Promise(function(resolve, reject) {
		HoundTools.handleFileUpload(payload).then(function(filepath) {
			if(filepath) {
				HoundReader.getData(filepath).then(function(response) {
					HoundTools.cleanDataFromObject(response).then(function(response) {
						resolve(response);
					}, function(err) { reject(err); });
				}, function(err) {
					console.log(err);
					reject(JSON.stringify(err));
				});
			}
		}, function(err) {
			console.log(err);
			reject(JSON.stringify(err));
		});
	});
};

module.exports = {
    getJsonFromFile:getJsonFromFile
};