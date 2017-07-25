// make function
// for break a line into n parts

var utils = require('./utils');
var points = require('./points');

var segmentLength = function(segment) {
  // console.log('[segment[0][0], segment[0][1]], [segment[1][0], segment[1][1]]', [segment[0][0], segment[0][1]], [segment[1][0], segment[1][1]]);
  var segmentLengthToReturn = points.distance([segment[0][0], segment[0][1]], [segment[1][0], segment[1][1]]);
  // console.log(segmentLengthToReturn);
  return segmentLengthToReturn;
};

var minDistanceBetweenPointToLineSegment = function(point, lineSegment) {
  var x = point[0];
  var y = point[1];

  var x1 = lineSegment[0][0];
  var y1 = lineSegment[0][1];

  var x2 = lineSegment[1][0];
  var y2 = lineSegment[1][1];

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) {
    param = dot / len_sq;
  }

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
};

var slope = function(segment) {
  return (segment[1][1] - segment[0][1]) / (segment[1][0] - segment[0][0]);
};

var slopeAngle = function(point1, point2) {
  return Math.atan(slope(point1, point2));
};

var isOnLine = function(point, segment) {
  return points.distance(point, segment[0]) + points.distance(point, segment[1]) == points.distance(segment[0], segment[1]);
};

function segmentsIntersect(seg1, seg2, precision) {
  var x1 = seg1[0][0],
    y1 = seg1[0][1],
    x2 = seg1[1][0],
    y2 = seg1[1][1],
    x3 = seg2[0][0],
    y3 = seg2[0][1],
    x4 = seg2[1][0],
    y4 = seg2[1][1],
    intPt, x, y, result = false,
    p = precision || 6,
    denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator == 0) {
    // check both segments are Coincident, we already know
    // that these two are parallel
    if (fix((y3 - y1) * (x2 - x1), p) == fix((y2 - y1) * (x3 - x1), p)) {
      // second segment any end point lies on first segment
      result = intPtOnSegment(x3, y3, x1, y1, x2, y2, p) ||
        intPtOnSegment(x4, y4, x1, y1, x2, y2, p);
    }
  } else {
    x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator;
    y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator;
    // check int point (x,y) lies on both segment
    result = intPtOnSegment(x, y, x1, y1, x2, y2, p) && intPtOnSegment(x, y, x3, y3, x4, y4, p);
  }
  return result;
}

function intPtOnSegment(x, y, x1, y1, x2, y2, p) {
  return fix(Math.min(x1, x2), p) <= fix(x, p) && fix(x, p) <= fix(Math.max(x1, x2), p) && fix(Math.min(y1, y2), p) <= fix(y, p) && fix(y, p) <= fix(Math.max(y1, y2), p);
}

// fix to the precision
function fix(n, p) {
  return parseInt(n * Math.pow(10, p));
}
// var segmentsIntersect = function(segment1, segment2) {
//   var toReturn = {};
//
//   segment1.slope = slope(segment1);
//   segment2.slope = slope(segment2);
//
//   toReturn = Math.abs(segment1.slope - segment2.slope) < Number.EPSILON ? 'parallel' : {
//     x: (segment1.slope * segment1[0][0] - segment2.slope * segment2[0][0] + segment2[0][1] - segment1[0][1]) / (segment1.slope - segment2.slope),
//     y: (segment1.slope * segment2.slope * (segment2[0][0] - segment1[0][0]) + segment2.slope * segment1[0][1] - segment1.slope * segment2[0][1]) / (segment2.slope - segment1.slope)
//   };
//
//   if (toReturn && Number.isNaN(toReturn.x) && Number.isNaN(toReturn.y)) {
//     toReturn = 'noIntersection'
//   }
//
//   if (toReturn && toReturn.x && toReturn.y) {
//     toReturn = [toReturn.x, toReturn.y];
//   }
//
//   var allPoints = [segment1[0], segment1[1], segment2[0], segment2[1]];
//   var firstDuplicate = utils.findFirstDuplicate(allPoints)[1];
//   console.log('*********', firstDuplicate);
//
//   // Check if intersection lies on one of the edges
//   if (firstDuplicate) {
//     toReturn = firstDuplicate
//   }
//
//   if (toReturn && typeof toReturn != 'string' && isOnLine(toReturn, segment1) && isOnLine(toReturn, segment2)) {
//     return 'noIntersection';
//   } else {
//     return toReturn;
//   }
//
// };

module.exports = {};
// module.exports.segmentsIntersect = segmentsIntersect;
module.exports.segmentsIntersect = segmentsIntersect;
module.exports.slope = slope;
module.exports.slopeAngle = slopeAngle;
module.exports.segmentLength = segmentLength;
module.exports.minDistanceBetweenPointToLineSegment = minDistanceBetweenPointToLineSegment;
