const csv = require('csv-to-json');
const CsvReader = function () {};

CsvReader.prototype.converter = csv;

CsvReader.prototype.getData = function (filepath) {
	const that = this;
	return new Promise(function(resolve, reject) {
		that.converter.parse({filename:filepath}, function(err, json) {
			if(err) {
				reject(err);
			} else {
				resolve(json);
			}
		});
	});
};

module.exports = new CsvReader();
