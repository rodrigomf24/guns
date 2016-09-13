const path = require('path'),
    app = require(path.resolve(__dirname, '../server/server')),
    ds = app.datasources.sutoreji;

ds.automigrate('ProductMapping', function(err) {
	if(err) throw err;

	app.models.ProductMapping.destroyAll([], function(err, info) {
		if(err) throw err;
	});

	var mappings = [
		{
			"mappingname":"BillHicks",
			"name":"name",
			"sku": "sku",
			"vendorcode": "vendorcode",
			"description": "description",
			"images": "images",
			"price": "price",
			"cost": "cost",
			"excerpt": "excerpt"
		}
	], count = mappings.length;
	mappings.forEach(function(mapping) {
		app.models.ProductMapping.create(mapping, function(err, model) {
				if(err) throw err;
				console.log('Created:', model);
				count--;
				if(count === 0)
						ds.disconnect();
		});
	});
});