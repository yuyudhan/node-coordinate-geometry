var lines = require('../../lib/lines');
// console.log(lines);
var utils = require('../../lib/utils');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

// minDistanceBetweenPointToLineSegment(point, lineSegment);
// minDistanceBetweenPointToLineSegment([0, 0], [
//   [1, 0],
//   [0, 1]
// ]);

var point0 = [0, 0];
var point1 = [1, 0];
var point2 = [5, 0];
var point3 = [60, 0];

var lineSegment1 = [
  [0, 0],
  [5, 5]
];

var lineSegment2 = [
  [0, 0],
  [50, 0]
];

var lineSegment3 = [
  [0, 0],
  [0, 50]
];

var lineSegment4 = [
  [50, 0],
  [0, 50]
];

var lineSegment5 = [
  [0, 0],
  [50, 50]
];
var lineSegment7 = [
  [50, 50],
  [75, 75]
];

describe('Slope calculator', function() {
  it('Should calculate correct slopes for different lines', function(done) {
    expect(lines.slope(lineSegment1)).to.equal(1);
    expect(lines.slope(lineSegment2)).to.equal(0);
    done();
  });
});

describe('Intersections function should', function() {
  it('Should provide correct points of intersections', function(done) {
    expect(lines.segmentsIntersect(lineSegment3, lineSegment4)).to.be.true; //equal([0, 50].toString());
    expect(lines.segmentsIntersect(lineSegment4, lineSegment5)).to.be.true; //equal([25, 25].toString());
    expect(lines.segmentsIntersect(lineSegment1, lineSegment3)).to.be.true; //equal([0, 0].toString());
    done();
  });

  it('Should say undefined when line segments don\'t intersect', function(done) {
    expect(lines.segmentsIntersect(lineSegment1, lineSegment4)).to.be.false; // .equal('noIntersection');
    done();
  });

  it('Should say parallel when the lines segments are parallel and wont intersect', function(done) {
    expect(lines.segmentsIntersect(lineSegment7, lineSegment5)).to.be.true; // equal('parallel');
    expect(lines.segmentsIntersect(lineSegment1, lineSegment7)).to.be.false; // equal('parallel');
    done();
  });



});

describe('Point to line minimum distance', function() {
  it('Should give correct distances', function(done) {
    expect(utils.matchUptoNDecimals(lines.minDistanceBetweenPointToLineSegment(point0, lineSegment1), 0 * Math.sqrt(2), 4)).to.be.true; // equal('parallel');
    expect(utils.matchUptoNDecimals(lines.minDistanceBetweenPointToLineSegment(point2, lineSegment2), 0 * Math.sqrt(2), 4)).to.be.true; // equal('parallel');
    expect(utils.matchUptoNDecimals(lines.minDistanceBetweenPointToLineSegment(point0, lineSegment7), 50 * Math.sqrt(2), 4)).to.be.true; // equal('parallel');
    expect(utils.matchUptoNDecimals(lines.minDistanceBetweenPointToLineSegment(point3, lineSegment1), 55.2268050, 4)).to.be.true; // equal('parallel');
    done();
  });
});
