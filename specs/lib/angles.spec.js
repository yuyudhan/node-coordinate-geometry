var angles = require('../../lib/angles');
var utils = require('../../lib/utils');


var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

describe('The angle conversion system', function() {
  it('Should interconvert sexagesimal to centesimal correctly ', function(done) {
    var sexaCenteMapping = [
      [0, 0],
      [100, 90],
      [200, 180]
    ];

    for (var i = 0; i < sexaCenteMapping.length; i++) {
      expect(angles.sexaToCente(sexaCenteMapping[i][0])).to.equal(sexaCenteMapping[i][1]);
      expect(angles.centeToSexa(sexaCenteMapping[i][1])).to.equal(sexaCenteMapping[i][0]);
    }
    done();
  });

  it('Should interconvert sexagesimal to circular correctly ', function(done) {
    var sexaCircMapping = [
      [0, 0],
      [100, Math.PI / 2],
      [200, Math.PI]
    ];

    for (var i = 0; i < sexaCircMapping.length; i++) {
      expect(utils.matchUptoNDecimals(angles.sexaToCirc(sexaCircMapping[i][0]), sexaCircMapping[i][1], 8)).to.equal(true);
      expect(utils.matchUptoNDecimals(angles.circToSexa(sexaCircMapping[i][1]), sexaCircMapping[i][0], 8)).to.equal(true);
    }

    done();
  });

  it('Should interconvert circular to centesimal correctly ', function(done) {
    var circSexaMapping = [
      [0, 0],
      [Math.PI / 2, 90],
      [Math.PI, 180]
    ];

    for (var i = 0; i < circSexaMapping.length; i++) {
      expect(utils.matchUptoNDecimals(angles.circToCente(circSexaMapping[i][0]), circSexaMapping[i][1], 8)).to.equal(true);
      expect(utils.matchUptoNDecimals(angles.centeToCirc(circSexaMapping[i][1]), circSexaMapping[i][0], 8)).to.equal(true);
    }

    done();
  });
});
