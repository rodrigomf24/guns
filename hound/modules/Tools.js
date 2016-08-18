const fs = require('fs');

const Tools = function() {};
Tools.prototype.fs = fs;
Tools.prototype.handleFileUpload = function(data) {
	const that = this;
	return new Promise(function(resolve, reject) {
		if(data.file) {
			const name = data.file.hapi.filename,
			path = __dirname + '/../uploads/import/'+name,
			file = that.fs.createWriteStream(path);

			file.on('error', function (err) {
				console.error('ERROR ON FILE STREAM', err); // improve error handling
				reject(err);
			});

			data.file.pipe(file);
			data.file.on('end', function(err) {
				if(err) reject(err);
				else resolve(path);
			});
		} else {
			reject('File is not valid');
		}
	});
};
Tools.prototype.cleanDataFromObject = function(data) {
	const that = this;
	return new Promise(function(resolve, reject) {
		if(typeof(data) !== 'object') {
			resolve(data);
		} else {
			resolve(data.reduce(function(acc, curr) {
				var tempObject = {}, count = 0;
				for( var key in curr ) {
					var cleanKey = key.replace(/["]+/g, '');
					tempObject[cleanKey] = curr[key];
					count++;
					if(count === Object.keys(curr).length) {
						console.log(tempObject);
						acc.push(tempObject);
						return acc;
					}
				}
			}, []));
		}
	});
};


module.exports = new Tools();
