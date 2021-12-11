const nodefetch = require('node-fetch');
const mainURL = 'http://overpass-api.de/api/interpreter?data=';

class OverpassQuery {
	constructor() {
		this.elements = [];
		this.format = 'json';
		this.timeout = 180;
	}
	addElement({ type, tags = [], bbox }) {
		const elementString = `${type}${tags.map(tag => `[${tag.key}${tag.not ? '!=' : '='}${tag.value}]`)}(${bbox.join(',')})`;
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
		if (this.elements.length == 0) throw new Error('No elements specified!');
		const response = await nodefetch(this.query);
		return JSON.parse(JSON.stringify(await (response).json()));
	}
}
module.exports = OverpassQuery;