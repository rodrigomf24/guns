const path = require('path'),
UsersMigration = require(path.resolve(__dirname, './migrations/users.js')),
ProductMigration = require(path.resolve(__dirname, './migrations/product.js'));

UsersMigration().then(function() {
	ProductMigration(true).then(function(){}, function(err) {
		throw err;
	});
}, function(err) {
	throw err;
});