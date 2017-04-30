var bbox = require('@turf/bbox');
var tilebelt = require('@mapbox/tilebelt');

module.exports = function(coords) {
  if (Array.isArray(coords[0]) === false) return [toTile(coords)]; //handle points
  if (Array.isArray(coords[0][0])) throw new Error('Only supports points and lines');
  var lines = [[coords[0]]];
  var line = 0;
  var last = 0;
  coords = coords.slice(1);
  while(coords.length) {
    var next = coords[0];
    coords = coords.slice(1);
    
  }
}

function toTile(coords) {
  var f = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: Array.isArray(coords[0]) ? 'LineString' : 'Point',
      coordinates: coords,
    }
  };

  var box = bbox(f);

  var tile = tilebelt.bboxToTile(box);
  while (tile[2] > 20) {
    tile = tilebelt.getParent(tile);
  }

  return tile;
}

