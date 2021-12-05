const nodefetch = require('node-fetch');
const mainURL = 'http://overpass-api.de/api/interpreter?data=[out:json];';

/**
 * The main hub for making queries with the overpass API
 */
class OverpassQuery {
	constructor() {
		this.elements = [];
        this.format = 
	}
	/**
     * Adds an element to the query
     */
	addElement({ type, tags, bbox }) {
		const elementString = `${type}${tags.map(tag => `[${Object.keys(tag)}=${Object.values(tag)}](${bbox.join(',')})`)}`;
		this.elements.push(elementString);
		return this;
	}
    setFormat(format) {

    }
	/**
     * Returns the Overpass API response for the query
     */
	async fetch() {
		const queryURL = `(${mainURL}${this.elements.join(';')};);out body;>;out skel qt;`;
		const response = await nodefetch(queryURL);
		return JSON.parse(JSON.stringify(await (response).json()));
	}
}
module.exports = OverpassQuery;