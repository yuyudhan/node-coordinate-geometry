var distance = function(point1, point2) {
  // console.log('************', point1, point2);
  var distanceToReturn = Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
  // console.log('(((((((((((((((((())))))))))))))))))', distanceToReturn);
  return distanceToReturn
};

module.exports = {};
module.exports.distance = distance;
