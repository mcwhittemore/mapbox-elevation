var tilebelt = require('@mapbox/tilebelt');
var pkg = require('./package.json');
var getPixels = require('get-pixels');

module.exports = function(tk) {
  return function(p, cb) {
    var tf = tilebelt.pointToTileFraction(p[0], p[1], 20);
    var tile = tf.map(Math.floor);
    var domain = 'https://api.mapbox.com/v4/';
    var source = `mapbox.terrain-rgb/${tile[2]}/${tile[0]}/${tile[1]}.pngraw`;
    var url = `${domain}${source}?access_token=${tk}`;
    getPixels(url, function(err, pixels) {
      if (err) return cb(err);
      var xp = tf[0] - tile[0];
      var yp = tf[1] - tile[1];
      var x = Math.floor(xp*pixels.shape[0]);
      var y = Math.floor(yp*pixels.shape[1]);

      var R = pixels.get(x, y, 0);
      var G = pixels.get(x, y, 1);
      var B = pixels.get(x, y, 2);

      var height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1);

      return cb(null, height);

    });
  }
}

