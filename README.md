# overpass.js

overpass.js is a [Node.js](https://nodejs.org) module that allows you to easily interact with the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API).

## example code

an overpass query like this:

```
[out:json][timeout:30];
(
    node[amenity=parking](47.48047027491862,19.039797484874725,47.51331674014172,19.07404761761427);
);
out body;
>;
out skel qt;
```

..can be expressed like:

```js
const { OverpassQuery } = require('overpass.js');

const query = new OverpassQuery()
    .setFormat('json')
    .setTimeout(30)
    .addElement({
        type: 'node',
        tags: [{ amenity: 'parking' }],
        bbox: [47.48047027491862, 19.039797484874725, 47.51331674014172, 19.07404761761427]
    });

```

and to fetch the query:

```js
const response = await query.fetch();
```

## example response

```js
{
  version: 0.6,
  generator: 'Overpass API 0.7.57 93a4d346',
  osm3s: {
    timestamp_osm_base: '2021-12-11T17:50:30Z',
    copyright: 'The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.'
  },
  elements: [
    {
      type: 'node',
      id: 260305115,
      lat: 47.4987947,
      lon: 19.053641,
      tags: [Object]
    }
  ]
}
```
