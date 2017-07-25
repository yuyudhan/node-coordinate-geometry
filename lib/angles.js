// interconversion between sexagesimal, centesimal and circular representations

// 200sexa = 180cente = PIcirc

// g represents french sexagesimal system
// d represents english centesimal system
// c represents mathematical circular system

var conversionMultipliers = {};
conversionMultipliers.sexaToCente = 180 / 200;
conversionMultipliers.sexaToCirc = Math.PI / 200;
conversionMultipliers.centeToCirc = Math.PI / 180;
conversionMultipliers.centeToSexa = 1 / conversionMultipliers.sexaToCente;
conversionMultipliers.circToSexa = 1 / conversionMultipliers.sexaToCirc;
conversionMultipliers.circToCente = 1 / conversionMultipliers.centeToCirc;

var sexaToCente = function(angle) {
  return angle * conversionMultipliers.sexaToCente;
};

var sexaToCirc = function(angle) {
  return angle * conversionMultipliers.sexaToCirc;
};

var circToSexa = function(angle) {
  return angle * conversionMultipliers.circToSexa;
};

var circToCente = function(angle) {
  return angle * conversionMultipliers.circToCente;
};

var centeToCirc = function(angle) {
  return angle * conversionMultipliers.centeToCirc;
};

var centeToSexa = function(angle) {
  return angle * conversionMultipliers.centeToSexa;
};


module.exports = {};
module.exports.sexaToCente = sexaToCente;
module.exports.sexaToCirc = sexaToCirc;
module.exports.circToSexa = circToSexa;
module.exports.circToCente = circToCente;
module.exports.centeToCirc = centeToCirc;
module.exports.centeToSexa = centeToSexa;
