var MapboxElevation = require('..');

var getElevation = MapboxElevation(process.env.MAPBOX_PUBLIC_TOKEN);

getElevation([0,0], function(err, elevation) {
  if (err) throw err;
  console.log('elevation at null island', elevation);
});

getElevation([-71.3030925, 44.270171], function(err, elevation) {
  if (err) throw err;
  console.log('elevation in mt washington nh', elevation);
});

getElevation([86.925313, 27.988730], function(err, elevation) {
  if (err) throw err;
  console.log('elevation at the peak of everest', elevation);
});

