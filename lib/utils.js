var arrayEquals = function(array2, array1) {
  // if the other array1 is a falsy value, return
  if (!array1)
    return false;

  // compare lengths - can save a lot of time
  if (array2.length != array1.length)
    return false;

  for (var i = 0, l = array2.length; i < l; i++) {
    // Check if we have nested arrays
    if (array2[i] instanceof Array && array1[i] instanceof Array) {
      // recurse into the nested arrays
      if (!array2[i].equals(array1[i]))
        return false;
    } else if (array2[i] != array1[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

var findFirstDuplicate = function(arrayToFind, typeOfMatch) {
  for (var i = 0; i < arrayToFind.length; i++) {
    for (var j = i + 1; j < arrayToFind.length; j++) {
      if (arrayToFind[i].toString() == arrayToFind[j].toString()) {
        return [i, arrayToFind[i]];
      }
    }
  }
  // if (typeOfMatch == 'string') {
  // }

  if (typeOfMatch == 'array') {
    return (array1.length == array2.length) && array1.every(function(element, index) {
      return element === array2[index];
    });
  }

  return false;
};

var matchUptoNDecimals = function(number1, number2, numberOfDecimals) {
  return number1.toFixed(numberOfDecimals) == number2.toFixed(numberOfDecimals);
};

module.exports = {};
module.exports.matchUptoNDecimals = matchUptoNDecimals;
module.exports.findFirstDuplicate = findFirstDuplicate;
