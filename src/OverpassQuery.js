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
	/**
   	 * Options for utilizing an element
     * @typedef {Object} ElementOptions
     * @property {string} [type] Type of element
     * @property {Object[]} [tags] Tags associated with the element
     * @property {number[]} [bbox] Bounding box for the element
     */

	/**
	 * Add an element to the query
	 * @param {ElementOptions} options Options for the element
	 * @returns {OverpassQuery}
	 */
	addElement({ type, tags = [], bbox }) {
		const elementString = `${type}${tags.map(tag => `[${Object.keys(tag)}=${Object.values(tag)}]`)}(${bbox.join(',')})`;
		this.elements.push(elementString);
		return this;
	}
	/**
	 * Sets the format of the query
	 * @param {string} format Desired format
	 * @returns {OverpassQuery}
	 */
	setFormat(format) {
		this.format = format;
		return this;
	}
	/**
	 * Sets the timeout of the query
	 * @param {number} format Desired timeout
	 * @returns {OverpassQuery}
	 */
	setTimeout(timeout) {
		this.timeout = timeout;
		return this;
	}
	/**
	 * The URL of the query
	 * @returns {string}
	 * @readonly
	 */
	get query() {
		return `${mainURL}[out:${this.format}][timeout:${this.timeout}];(${this.elements.join(';')};);out body;>;out skel qt;`;
	}
	/**
	 * Fetches the query
	 * @returns {any}
	 */
	async fetch() {
		if (this.elements.length == 0) throw new Error('No elements specified!');
		const response = await nodefetch(this.query);
		return JSON.parse(JSON.stringify(await (response).json()));
	}
}
module.exports = OverpassQuery;