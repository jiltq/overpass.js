const overpass = require('./src');

async function main() {
	const query = new overpass.Query()
		.addElement({ type: 'node', 'tags': [{ amenity: 'restaurant' }], 'bbox': [48.85697876155512, 2.344658374786377, 48.86104454579247, 2.352468967437744] });

	const response = await query.fetch();
	console.log(response);
}
main();