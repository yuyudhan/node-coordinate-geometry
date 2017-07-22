var matchUptoNDecimals = function(number1, number2, numberOfDecimals) {
  return number1.toFixed(numberOfDecimals) == number2.toFixed(numberOfDecimals);
};

module.exports = {};
module.exports.matchUptoNDecimals = matchUptoNDecimals;
