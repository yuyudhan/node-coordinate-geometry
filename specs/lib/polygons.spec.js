var polygons = require('../../lib/polygons');
var utils = require('../../lib/utils');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should;

var point1 = [1, 1];
var point2 = [100, 100];

var triangle0 = [
  [0, 0],
  [0, 0],
  [0, 0],
];

var triangle1 = [
  [0, 0],
  [5, 0],
  [0, 5],
];

var square1 = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1]
];

var square2 = [
  [4, 3],
  [5, 3],
  [5, 4],
  [4, 4]
];

var polygon1 = [
  [0, 0],
  [10, 0],
  [10, 2],
  [12, 8],
  [6, 10],
  [2, 8]
];

describe('Polygon checker if point inside', function() {
  it('Should say inside for points inside different types of polygons', function(done) {
    expect(polygons.pointToPoly(point1, triangle1)).to.equal('inside');
    expect(polygons.pointToPoly(point1, polygon1)).to.equal('inside');
    expect(polygons.pointToPoly(point1, triangle1)).to.equal('inside');
    done();
  });

  it('Should show onPolygon for points on edges', function(done) {
    expect(polygons.pointToPoly(point1, square1)).to.equal('onPolygon');
    done();
  });

  it('Should show outside for points outside', function(done) {
    expect(polygons.pointToPoly(point1, square2)).to.equal('outside');
    expect(polygons.pointToPoly(point2, triangle1)).to.equal('outside');
    expect(polygons.pointToPoly(point2, square2)).to.equal('outside');
    expect(polygons.pointToPoly(point2, square1)).to.equal('outside');
    expect(polygons.pointToPoly(point2, polygon1)).to.equal('outside');
    done();
  });
});

describe('Polygon area calculator', function() {
  it('Should calculate correct areas for squares', function(done) {
    expect(polygons.area(square1)).to.equal(1);
    expect(polygons.area(square2)).to.equal(1);
    done();
  });
  it('Should calculate correctly for triangels', function(done) {
    expect(polygons.area(triangle0)).to.equal(0);
    expect(polygons.area(triangle1)).to.equal(12.5);
    done();
  });
  it('Should calculate correctly for otherPolygons', function(done) {
    // Test cases to be added here
    done();
  });
});


//
// var minDistance = minDistanceBetweenPolygons(polygon1, polygon2);
// console.log(minDistance);
