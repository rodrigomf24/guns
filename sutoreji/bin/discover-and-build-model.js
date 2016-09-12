var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.dataSources.sutoreji;
ds.discoverAndBuildModels('product', {schema:'public'}, function(err, models) {
	if(err) throw err;
	console.log(models);
	models.Product.find(function(err, products) {
		if(err) return console.log(err);

		console.log(products);

		ds.disconnect();
	});
});

/*ds.discoverAndBuildModels('productMapping', {schema:'public'}, function(err, models) {
	if(err) throw err;
	console.log(models);
	models.ProductMapping.find(function(err, mapping) {
		if(err) return console.log(err);
		console.log(mapping);
		ds.disconnect();
	});
});*/
