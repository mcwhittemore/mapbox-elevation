var getTiles = require('../lib/get-tile');
var test = require('tape');

test('[unit] getTiles turns point into a zoom 20 tile', function(assert) {
  var tiles = getTiles([0, 0]);
  assert.equals(1, tiles.length, 'points make one tile');
  assert.equals(20, tiles[0].tile[2], 'points are at zoom 20');

  assert.end();
});

test('[unit] getTiles turns a really short line into a zoom 20 tile', function(assert) {
  var line = [
    [
      -73.933235,
      40.8555040
    ],
    [
      -73.933226,
      40.8555289
    ]
  ];

  var tiles = getTiles(line);
  assert.equals(tiles.length, 1, 'should be one tile');
  assert.equals(tiles[0].tile[2], 20, 'at zoom 20');
  assert.end();
});

test('[unit] getTiles turns a very short line that crosses the meridian into two z20 tiles', function(assert) {
  var line = [
    [
      -0.000011,
      51.47722
    ],
    [
      0.000011,
      51.477059
    ]
  ];

  var tiles = getTiles(line);
  assert.equals(tiles.length, 2, 'should be two tiles');
  for (var i=0; i<tiles.length; i++) {
    assert.equals(tiles[i].tile[2], 20, 'at zoom 20');
  }
  assert.end();

});
