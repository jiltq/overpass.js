const overpass = require('./src');

async function main() {
	const query = new overpass.OverpassQuery()
		.setFormat('json')
		.setTimeout(30)
		.addElement({
			type: 'node',
			tags: [{
				key: 'amenity',
				value: 'parking',
				not: false,
			}],
			bbox: [47.48047027491862, 19.039797484874725, 47.51331674014172, 19.07404761761427],
		});

	const response = await query.fetch();
	console.log(response.elements);
}
main();