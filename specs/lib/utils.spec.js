var utils = require('../../lib/utils');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

describe('Approximate to n decimals matcher', function() {
  it('Should match upto n decimal places', function(done) {
    var number1 = 1.5707963267948968;
    var number2 = 1.5707963267948966;
    expect(utils.matchUptoNDecimals(number1, number2, 5)).to.equal(true);
    expect(utils.matchUptoNDecimals(number1, number2, 7)).to.equal(true);
    expect(utils.matchUptoNDecimals(5, 6, 7)).to.equal(false);
    done();

  });

});
