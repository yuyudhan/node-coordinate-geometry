// const Matrix = require('node-matrix');

// getCoordinatesOnRotatedAxes([1, 1], Math.PI / 2);

var getCoordinatesOnRotatedAxes = function(point, angleOfRotation) {

  var pointPatrix = Matrix([
    point
  ]);

  var multiplicationMatrix = Matrix([
    [Math.cos(angleOfRotation), Math.sin(angleOfRotation)],
    [-Math.sin(angleOfRotation), -Math.cos(angleOfRotation)]
  ]);

  return Matrix.multiply(pointPatrix, multiplicationMatrix)['1'];
};

module.exports = {};
module.exports.getCoordinatesOnRotatedAxes = getCoordinatesOnRotatedAxes;
