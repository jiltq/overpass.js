<div align="center">
  <br />
  <p>
    <a href="http://www.overpass-api.de"><img src="https://cdn.discordapp.com/attachments/816126601184018472/917209539231748146/overpasslogo.png" width="500" alt="overpass api" /></a>
  </p>
  <br />
</div>

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
