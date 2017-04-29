# Mapbox Elevation

Quickly get the elevation of any point in the world from Mapbox's terrian-rgb datasource.

This module requires a Mapbox account to use. [Get a free one here](https://www.mapbox.com/signup/).

The result is in meters.

For details on how this works, please see [this blog post](https://www.mapbox.com/blog/terrain-rgb/).

## Usage

`npm install mapbox-elevation`

```js
var MapboxElevation = require('mapbox-elevation');
var getElevation('YOUR-MAPBOX-TOKEN');

getElevation([86.925313, 27.988730], function(err, elevation) {
  console.log('elevation at the summit of mt everest', elevation);
});
```

## API

**getElevation(point, callback)**

The point must be a [longitude, latitude] array and the callback follows the standard (err, value) convension of node.
