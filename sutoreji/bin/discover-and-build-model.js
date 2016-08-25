var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.dataSources.sutoreji;
ds.discoverAndBuildModels('product', {schema:'public'}, function(err, models) {
	if(err) throw err;

	models.Product.find(function(err, products) {
		if(err) return console.log(err);

		console.log(products);

		ds.disconnect();
	});
});
