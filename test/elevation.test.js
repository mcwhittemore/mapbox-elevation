var MapboxElevation = require('..');
var test = require('tape');

var getElevation = MapboxElevation(process.env.MAPBOX_PUBLIC_TOKEN);

test('[integration] gets a point right at null island', function(assert) {
  getElevation([0,0], function(err, elevation) {
    if (err) return assert.end(err);
    assert.equal(0, elevation, 'null island is at sea level');
    assert.end();
  });
});

test('[integration] gets a point right on mt washington', function(assert) {
  getElevation([-71.3030925, 44.270171], function(err, elevation) {
    if (err) return assert.end(err);
    assert.equal(1912.1000000000004, elevation, 'mt washington is 1912.1000000000004 meters above sea level');
    assert.end();
  });
});

