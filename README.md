# Coordinate geometry for Node & JS applications
Set of commonly required functions and functionalities relating to 2d geometry.


## Still under heavy development
This module is going to contain common and uncommon functions and functionalities required in coordinate geometry, specifically for NodeJS and front-end javascript applications.

#### Contributions
The repository is in its very nascent stage and open for contribution. In the absense of a proper repository for 2d geometry utilities, this project is highly needed. Connect @yuyudhan.

#### Upcoming features are
1. Common functions and utilities in 2d geometry
2. Support for polar (Radial) coordinates.

## Installation
```sh
npm i node-coordinate-geometry --save
```

## Usage
```js
// Simple usaga
var ncg = require('node-coordinate-geometry');
var polygons = ncg.polygons;
console.log(polygons.pointInside([0, 0], [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
]));
```
### More available modules
```js
var ncg = require('node-coordinate-geometry');
var angles = ncg.angles;
var axes = ncg.axes;
var lines = ncg.lines;
var points = ncg.points;
var polygons = ncg.polygons;
```
**More detailed documentation of each module can be found in the Detailed Documentation sectoin below.**

## Testing

Repository uses ChaiJS as assertion engine and mocha as test runner.

```sh
mocha --recursive specs/
```


# Detailed documentation
### Representations of figures
The repository follows the following conventions on representations of different 2d geometry entities.

#### Angle
Angle is represented in radians throughout. Inter conversions from Sexagesimal, Centesimal and Circular Systems are available in angles routine.

#### A point
Point is represented by a single dimensional array of length 2 as below.
```js
[x,y]
```
#### A line segment
Line segment is represented using an array of points as below.
```js
[[x1, y1], [x2, y2]]
```
#### Polygon
Polygon is represented by a set of points as below
```js
[[x1, y1], [x2, y2], [x3, y3], ...., [xn, yn]]
```

##### The documentation is still under development, stay tuned.
