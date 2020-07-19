var tilebelt      = require('@mapbox/tilebelt');
var ndarray       = require('ndarray')
var PNG           = require('pngjs').PNG
const fetch       = require('node-fetch');

//
// Configure MapBox token on the require
module.exports = function(tk) {

  // Actually lookup the location and provide it to the cb function
  return function(p, cb) {
    var tf = tilebelt.pointToTileFraction(p[0], p[1], 20);
    var tile = tf.map(Math.floor);
    var domain = 'https://api.mapbox.com/v4/';
    var source = `mapbox.terrain-rgb/${tile[2]}/${tile[0]}/${tile[1]}.pngraw`;
    var url = `${domain}${source}?access_token=${tk}`;

    // Convert to elevation
    function pixelsToElevation(pixels) {
      var xp = tf[0] - tile[0];
      var yp = tf[1] - tile[1];
      var x = Math.floor(xp*pixels.shape[0]);
      var y = Math.floor(yp*pixels.shape[1]);

      var R = pixels.get(x, y, 0);
      var G = pixels.get(x, y, 1);
      var B = pixels.get(x, y, 2);

      var height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1);
      return Math.floor(height);
    }

    // With a PNG from fetch we can create the NDArray we need
    // to calculate the elevation
    function parsePNG(err,img_data) {
      if( err ) {
        throw(err);
      }
      // Save it away
      const pixels = ndarray(new Uint8Array(img_data.data),
                             [img_data.width|0, img_data.height|0, 4],
                             [4, 4*img_data.width|0, 1],
                             0)

      return cb( null, pixelsToElevation(pixels) );
    };

    // Go and get the URL
    fetch( url )
      .then( (res) => res.arrayBuffer() )
      .then( data => {
        (new PNG()).parse( data, parsePNG );
      })
      .catch(err => {
        return cb(err,null);
      });
  }
}

