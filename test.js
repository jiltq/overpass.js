const overpass = require('./src');

async function main() {
	const query = new overpass.OverpassQuery()
		.addElement({
			type: 'node',
			// 'tags': [{ natural: 'ombrometer' }],
			'bbox': [28.614483684004764, 77.28437528014183, 28.61516180926761, 77.28535160422325],
		});

	const response = await query.fetch();
	console.log(response.elements);
}
main();