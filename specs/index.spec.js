var index = require('../index');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

describe('The root exposing file which is required', function() {
  it('should expose required endpoints', function(done) {
    expect(index.utils).to.exist;
    expect(index.angles).to.exist;
    expect(index.axes).to.exist;
    expect(index.lines).to.exist;
    expect(index.points).to.exist;
    expect(index.polygons).to.exist;
    done();
  });
});
