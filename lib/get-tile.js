var bbox = require('@turf/bbox');
var tilebelt = require('@mapbox/tilebelt');

module.exports = function(coords) {
  if (Array.isArray(coords[0]) === false) return [{point: coords, tile: toTile(coords)}]; //handle points
  if (Array.isArray(coords[0][0])) throw new Error('Only supports points and lines');
  var lines = [[coords[0]]];
  var line = 0;
  var last = 0;
  coords = coords.slice(1);
  while(coords.length) {
    var curr = coords[0];
    var back = lines[line][last];
    coords = coords.slice(1); 

    if((curr[0] < 0 && back[0] > 0) || (curr[0] > 0 && back[0] < 0)) {
      var dg = Math.abs(curr[0]) + back[0];
      var dp = 180-Math.abs(curr[0]) + (180-back[0]);

      var middleLeft = [];
      var middleRight = [];

      console.log(dg, dp);

      if (dg < dp) {
        middleLeft = [curr[0] > 0 ? -0.000001 : 0.000001];
        middleRight = [curr[0] < 0 ? -0.000001 : 0.000001];
      }
      else {
        // TODO: wrap
        middleLeft = [NaN];
        middleRight = [NaN];
      }

      var dlat = Math.abs(curr[1] - back[1]);
      var dlng = Math.abs(middleLeft[0] - back[0]);
      var latPerLng = dlat / dlng;
      var blng = Math.abs(curr[0] - middleLeft[0]);

      middleLeft[1] = back[1] + (blng*latPerLng);
      middleRight[1] = middleLeft[1];

      lines[line].push(middleLeft);
      lines.push([middleRight, curr]);

      curr = null;
      line++;
      last = 0;
    }
    
    // add point to line
    if (curr) lines[line].push(curr);

  }

  console.log('lines', lines);
  return lines.map((l) => ({
    line: l,
    tile: toTile(l)
  }));
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

