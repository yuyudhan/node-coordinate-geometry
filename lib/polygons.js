var robustPnp = require('robust-point-in-polygon');

var pointToPoly = function(point, polygon) {
  var pointToPolyRelation = robustPnp(polygon, point);
  switch (pointToPolyRelation) {
    case -1:
      return 'inside';
      break;
    case 0:
      return 'onPolygon';
      break;
    case 1:
      return 'outside';
      break;
    default:
      return 'Error'
  }
};

var polygonArea = function(polygon) {
  var e0 = [0, 0];
  var e1 = [0, 0];

  var area = 0;
  var first = polygon[0];

  for (var i = 2; i < polygon.length; i++) {
    var p = polygon[i - 1];
    var c = polygon[i];
    e0[0] = first[0] - c[0];
    e0[1] = first[1] - c[1];
    e1[0] = first[0] - p[0];
    e1[1] = first[1] - p[1];

    area += (e0[0] * e1[1]) - (e0[1] * e1[0]);
  }

  return Math.abs(area) / 2;
};

module.exports = {};
module.exports.pointToPoly = pointToPoly;
module.exports.area = polygonArea;
