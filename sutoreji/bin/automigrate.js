var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.sutoreji;

ds.automigrate('Product', function(err) {

	if(err) throw err;

	var products = [
		{
			"name": "TEST PRODUCT",
			"sku": "TEST001",
			"vendorcode": "VENDORTEST001",
			"description": "THIS IS A TEST",
			"images": {"thumb":"https://placeholdit.imgix.net/~text?txtsize=21&txt=TEST&w=150&h=150"},
			"price": 10,
			"cost": 5,
			"excerpt": "THIS IS THE SHORT DESCRIPTION",
			"id": 0
		},
		{
                        "name": "TEST PRODUCT 2",
                        "sku": "TEST002",
                        "vendorcode": "VENDORTEST001",
                        "description": "THIS IS A TEST",
                        "images": {"thumb":"https://placeholdit.imgix.net/~text?txtsize=21&txt=TEST&w=150&h=150"},
                        "price": 6,
                        "cost": 2,
                        "excerpt": "THIS IS THE SHORT DESCRIPTION",
                        "id": 1
                },
		{
                        "name": "TEST PRODUCT 3",
                        "sku": "TEST003",
                        "vendorcode": "VENDORTEST001",
                        "description": "THIS IS A TEST",
                        "images": {"thumb":"https://placeholdit.imgix.net/~text?txtsize=21&txt=TEST&w=150&h=150"},
                        "price": 22,
                        "cost": 12,
                        "excerpt": "THIS IS THE SHORT DESCRIPTION",
                        "id": 2
                }
	];

	var count =  products.length;
	products.forEach(function(product) {
		app.models.Product.create(product, function(err, model) {
			if(err) throw err;
			console.log('Created:', model);
			count--;
			if(count === 0)
				ds.disconnect();
		});
	});
});

ds.automigrate('ProductMapping', function(err) {
	if(err) throw err;

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
	];
	var count = mappings.length;
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

















