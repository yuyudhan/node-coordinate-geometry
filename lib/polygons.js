var robustPnp = require('robust-point-in-polygon');

var lines = require('./lines');

var getBoundingRect = function(polygons) {
  var minX = 1010101010;
  var minY = 1010101010;

  var maxX = 0;
  var maxY = 0;

  for (var i = 0; i < polygons.length; i++) {
    for (var j = 0; j < polygons[i].length; j++) {

      if (polygons[i][j][0] < minX) {
        minX = polygons[i][j][0];
      }

      if (polygons[i][j][1] < minY) {
        minY = polygons[i][j][1];
      }

      if (polygons[i][j][0] > maxX) {
        maxX = polygons[i][j][0];
      }

      if (polygons[i][j][1] > maxY) {
        maxY = polygons[i][j][1];
      }
    }
  }

  var boundingRect = [
    [minX, minY],
    [maxX, minY],
    [maxX, maxY],
    [minX, maxY]
  ];

  return boundingRect;
};
//
// var charge1 = [
//   [814, 175],
//   [1027, 175],
//   [1027, 214],
//   [814, 214]
// ];
// var charge2 = [
//   [1063, 224],
//   [1092, 223],
//   [1093, 253],
//   [1064, 254]
// ];
//
// console.log(getBoundingRect([charge1, charge2]));

var longestAndShortestEdges = function(polygon) {
  // console.log('Polygon', polygon);
  var shortestTillNow = [
    [0, 0], 100000
  ];

  var longestTillNow = [
    [0, 0], 0
  ];;

  for (var j = 0; j < polygon.length; j++) {
    // console.log('&&&&&&&&&');
    var nthVertex = [polygon[j][0], polygon[j][1]];

    var nPlusOnethVertex = [];

    if (j < polygon.length - 1) {
      nPlusOnethVertex = [polygon[j + 1][0], polygon[j + 1][1]];
    } else {
      nPlusOnethVertex = [polygon[0][0], polygon[0][1]];
    }
    // console.log('&&&&&&&&&&&&&&&&&');
    // console.log(nthVertex, nPlusOnethVertex);
    var edgeLength = lines.segmentLength([nthVertex, nPlusOnethVertex]);
    // console.log(edgeLength);
    // console.log('@@@@@@@@@@@@@@@@@@@@');

    if (edgeLength > longestTillNow[1]) {
      // console.log('((((((');
      longestTillNow = [
        [nthVertex, nPlusOnethVertex], edgeLength
      ];
    }

    if (edgeLength < shortestTillNow[1]) {
      // console.log(')))))))))))');
      shortestTillNow = [
        [nthVertex, nPlusOnethVertex], edgeLength
      ];
    }
  }

  // console.log('*********************');
  // console.log();
  var toReturn = [shortestTillNow, longestTillNow];
  // console.log(JSON.stringify(toReturn, null, 2), '!!!!!!!!!!!!!!!!');

  return [shortestTillNow, longestTillNow];

};

var checkIntersection = function(polygon1, polygon2) {
  var polygon1Edges = [];
  var polygon2Edges = [];

  for (var j = 0; j < polygon1.length; j++) {
    var nthVertex = [polygon1[j][0], polygon1[j][1]];

    var nPlusOnethVertex = [];

    if (j < polygon1.length - 1) {
      nPlusOnethVertex = [polygon1[j + 1][0], polygon1[j + 1][1]];
    } else {
      nPlusOnethVertex = [polygon1[0][0], polygon1[0][1]];
    }
    polygon1Edges.push([
      [nthVertex[0], nthVertex[1]],
      [nPlusOnethVertex[0], nPlusOnethVertex[1]]
    ]);
  }

  for (var j = 0; j < polygon2.length; j++) {
    var nthVertex = [polygon2[j][0], polygon2[j][1]];

    var nPlusOnethVertex = [];

    if (j < polygon2.length - 1) {
      nPlusOnethVertex = [polygon2[j + 1][0], polygon2[j + 1][1]];
    } else {
      nPlusOnethVertex = [polygon2[0][0], polygon2[0][1]];
    }
    polygon2Edges.push([
      [nthVertex[0], nthVertex[1]],
      [nPlusOnethVertex[0], nPlusOnethVertex[1]]
    ]);
  }

  for (var i = 0; i < polygon1Edges.length; i++) {
    for (var j = 0; j < polygon2Edges.length; j++) {
      var intersection = lines.segmentsIntersect(polygon1Edges[i], polygon2Edges[j]);
      // console.log(polygon1Edges[i], polygon2Edges[j]);
      // console.log('**************intersection', intersection);
      if (intersection) {
        // console.log('returning true ', intersection);
        return true;
      }
    }
  }
  return false;
};

var minVerticesToEdgeDistance = function(polygon1, polygon2) {

  var minDistanceTillNow = Math.pow(2, 32); // largest possible number in 32 bit machine

  var polygon1Edges = [];
  var polygon2Edges = [];

  for (var j = 0; j < polygon1.length; j++) {
    var nthVertex = [polygon1[j][0], polygon1[j][1]];

    var nPlusOnethVertex = [];

    if (j < polygon1.length - 1) {
      nPlusOnethVertex = [polygon1[j + 1][0], polygon1[j + 1][1]];
    } else {
      nPlusOnethVertex = [polygon1[0][0], polygon1[0][1]];
    }
    polygon1Edges.push([nthVertex[0], nthVertex[1], nPlusOnethVertex[0], nPlusOnethVertex[1]]);
  }

  for (var j = 0; j < polygon2.length; j++) {
    var nthVertex = [polygon2[j][0], polygon2[j][1]];

    var nPlusOnethVertex = [];

    if (j < polygon2.length - 1) {
      nPlusOnethVertex = [polygon2[j + 1][0], polygon2[j + 1][1]];
    } else {
      nPlusOnethVertex = [polygon2[0][0], polygon2[0][1]];
    }
    polygon2Edges.push([nthVertex[0], nthVertex[1], nPlusOnethVertex[0], nPlusOnethVertex[1]]);
  }

  for (var i = 0; i < polygon1.length; i++) {
    for (var j = 0; j < polygon2Edges.length; j++) {
      var minDistanceDetected = lines.minDistanceBetweenPointToLineSegment(polygon1[i], [
        [polygon2Edges[j][0], polygon2Edges[j][1]],
        [polygon2Edges[j][2], polygon2Edges[j][3]]
      ]);
      if (minDistanceDetected < minDistanceTillNow) {
        minDistanceTillNow = minDistanceDetected;
      }
    }
  }

  for (var i = 0; i < polygon2.length; i++) {
    for (var j = 0; j < polygon1Edges.length; j++) {
      var minDistanceDetected = lines.minDistanceBetweenPointToLineSegment(polygon2[i], [
        [polygon1Edges[j][0], polygon1Edges[j][1]],
        [polygon1Edges[j][2], polygon1Edges[j][3]]
      ]);
      if (minDistanceDetected < minDistanceTillNow) {
        minDistanceTillNow = minDistanceDetected;
      }
    }
  }

  return minDistanceTillNow;
};

// var testItem1 = [
//   [814, 175],
//   [1027, 175],
//   [1027, 214],
//   [814, 214]
// ];
//
// var testItem2 = [
//   [670, 234],
//   [922, 227],
//   [923, 259],
//   [671, 266]
// ];
//
// console.log('34567', minVerticesToEdgeDistance(testItem1, testItem2));

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

var checkInside = function(polygon1, polygon2) {
  for (var i = 0; i < polygon1.length; i++) {
    if (pointToPoly(polygon1[i], polygon2) == 'outside') {
      // console.log(polygon1[i], polygon2);
      return false;
    }
  }
  return true;
};


module.exports = {};
module.exports.pointToPoly = pointToPoly;
module.exports.area = polygonArea;
module.exports.longestAndShortestEdges = longestAndShortestEdges;
module.exports.checkIntersection = checkIntersection;
module.exports.getBoundingRect = getBoundingRect;
module.exports.checkInside = checkInside;
module.exports.minVerticesToEdgeDistance = minVerticesToEdgeDistance;
