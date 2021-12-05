const nodefetch = require('node-fetch');
const mainURL = 'http://overpass-api.de/api/interpreter?data=[out:json];';

/**
 * The main hub for making queries with the overpass API
 */
class Query {
	constructor() {
		this.elements = [];
	}
	/**
     * Adds an element to the query
     */
	addElement({ name, tags, bbox }) {
		const elementString = `${name}${tags.map(tag => `[${Object.keys(tag)}=${Object.values(tag)}](${bbox.join(',')})`)}`;
		console.log(elementString);
		this.elements.push(elementString);
		return this;
	}
	/**
     * Returns the Overpass API response for the query
     */
	async fetch() {
		const queryURL = `(${mainURL}${this.elements.join(';')};);out body;>;out skel qt;`;
		console.log(queryURL);
		const response = await nodefetch(queryURL);
		return JSON.parse(JSON.stringify(await (response).json()));
	}
}
module.exports = Query;