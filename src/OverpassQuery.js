const nodefetch = require('node-fetch');
const mainURL = 'http://overpass-api.de/api/interpreter?data=';

/**
 * The main hub for making queries with the overpass API
 */
class OverpassQuery {
	constructor() {
		this.elements = [];
		this.format = 'json';
		this.timeout = 180;
	}
	addElement({ type, tags, bbox }) {
		const elementString = `${type}${tags.map(tag => `[${Object.keys(tag)}=${Object.values(tag)}](${bbox.join(',')})`)}`;
		this.elements.push(elementString);
		return this;
	}
	setFormat(format) {
		this.format = format;
		return this;
	}
	setTimeout(timeout) {
		this.timeout = timeout;
		return this;
	}
	get query() {
		return `${mainURL}[out:${this.format}][timeout:${this.timeout}];(${this.elements.join(';')};);out body;>;out skel qt;`;
	}
	async fetch() {
		const response = await nodefetch(this.query);
		return JSON.parse(JSON.stringify(await (response).json()));
	}
}
module.exports = OverpassQuery;