const GRID_WIDTH = parseInt(process.env.REACT_APP_GRID_WIDTH, 10);
const GRID_HEIGHT = parseInt(process.env.REACT_APP_GRID_HEIGHT, 10);
const DIRECTIONS = {
  1: 'north',
  2: 'south',
  3: 'east',
  4: 'ouest'
};
var ships = require('./ships.json');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDirection(triedDirection) {
  return DIRECTIONS[getRandomInt(1, 4)];
}

module.exports = {
  positionShips: function () {
    var positionnedShips = [];

    for (var shipName in ships) {
      if (ships[shipName]) {
        let ship = ships[shipName];

        this.positionShip(ship, positionnedShips);

        positionnedShips.push(ship);
      }
    }
  },

  positionShip: function(ship, positionnedShips) {
    ship.frontX = getRandomInt(1, GRID_WIDTH);
    ship.frontY = getRandomInt(1, GRID_HEIGHT);

    ship.direction = this.getShipDirection(ship.frontX, ship.frontY, ship.size, positionnedShips);
    if (!ship.direction) {
      this.positionShip(ship, positionnedShips);
    }
  },

  getShipDirection: function(frontX, frontY, shipSize, positionnedShips, triedDirection = []) {
    if (triedDirection.length === 4) {
      return null;
    }

    var direction = getDirection(triedDirection);

    if (triedDirection.indexOf(direction) !== -1) {
      direction = this.getShipDirection(frontX, frontY, shipSize, positionnedShips, triedDirection);
    }

    triedDirection.push(direction);

    if (!this.isShipInGrid(frontX, frontY, shipSize, direction)) {
      direction = this.getShipDirection(frontX, frontY, shipSize, positionnedShips, triedDirection);
    }

    if (this.isShipOverlapingPositionnedShips(frontX, frontY, shipSize, direction, positionnedShips)) {
      direction = this.getShipDirection(frontX, frontY, shipSize, positionnedShips, triedDirection);
    }

    return direction;
  },

  isShipInGrid: function(frontX, frontY, shipSize, direction) {
    var shipInGrid = false;

    if (
      (direction === 'north' && frontY + (shipSize - 1) <= GRID_HEIGHT) ||
      (direction === 'south' && frontY - (shipSize - 1) >= 1) ||
      (direction === 'east' && frontX - (shipSize - 1) >= 1) ||
      (direction === 'ouest' && frontX + (shipSize - 1) <= GRID_WIDTH)
    ) {
      shipInGrid = true;
    }

    return shipInGrid;
  },

  isShipOverlapingPositionnedShips: function(frontX, frontY, shipSize, direction, positionnedShips) {
    var shipOverlapping = false;

    var positionsOfPositionnedShips = [];
    positionnedShips.forEach(ship => {
      positionsOfPositionnedShips = positionsOfPositionnedShips.concat(this.getShipPositions(ship.frontX, ship.frontY, ship.size, ship.direction));
    });

    var positionsOfNewShip = this.getShipPositions(frontX, frontY, shipSize, direction);

    positionsOfNewShip.forEach(positionNew => {
      var matchingPositions = positionsOfPositionnedShips.filter(positionOld => positionOld.x === positionNew.x && positionOld.y === positionNew.y)

      if (matchingPositions.length > 0) {
        shipOverlapping = true;
      }
    });

    return shipOverlapping;
  },

  getShipPositions: function(frontX, frontY, shipSize, direction) {
    var positions = [];
    var i;

    if (direction === 'north') {
      for (i = 0; i < shipSize; i++) {
        positions.push({x: frontX, y: frontY + i});
      }
    } else if (direction === 'south') {
      for (i = 0; i < shipSize; i++) {
        positions.push({x: frontX, y: frontY - i});
      }
    } else if (direction === 'east') {
      for (i = 0; i < shipSize; i++) {
        positions.push({x: frontX - i, y: frontY});
      }
    } else if (direction === 'ouest') {
      for (i = 0; i < shipSize; i++) {
        positions.push({x: frontX + i, y: frontY});
      }
    }

    return positions;
  },

  isShipOnCoordinates: function(x, y) {
    var shipsCoordinates = [];

    for (var shipName in ships) {
      if (ships[shipName]) {
        let ship = ships[shipName];

        shipsCoordinates = shipsCoordinates.concat(this.getShipPositions(ship.frontX, ship.frontY, ship.size, ship.direction));
      }
    }

    var matchingCoordinates = shipsCoordinates.filter(coordinates => coordinates.x === x && coordinates.y === y);

    return matchingCoordinates.length > 0;
  }
};
