import {getRandomInt} from './utils';
import Battleship from './Battleship';
import Destroyer from './Destroyer';

var ships = { Battleship, Destroyer };

const WIDTH = 10;
const HEIGHT = 10;
const DIRECTIONS = ['north', 'south', 'east', 'ouest'];

class Grid {
  constructor() {
    this.ships = [];
    this.shotCoordinates = [];
    this.hitCoordinates = [];
  }

  getWidth() {
    return WIDTH;
  }
  getHeight() {
    return HEIGHT;
  }

  isShipOnCoordinates(x, y) {
    var matchingShips = this.ships.filter(ship => {
      return ship.isOnCoordinates(x, y);
    });

    return matchingShips.length > 0;
  }

  addShip(type) {
    if (ships[type]) {
      var ship = new ships[type]();
      var coordinates = this.generateCoordinates();
      var direction = this.selectDirection(coordinates.x, coordinates.y, ship.getSize());

      if (!direction) {
        this.addBattleship();
      } else {
        ship.setFrontCoordinates(coordinates.x, coordinates.y);
        ship.setDirection(direction);

        this.ships.push(ship);
      }
    }
  }

  generateCoordinates() {
    var x = getRandomInt(1, WIDTH);
    var y = getRandomInt(1, HEIGHT);

    if (this.isShipOnCoordinates(x, y)) {
      return this.generateCoordinates();
    }

    return {x, y};
  }

  selectDirection(x, y, shipSize, directions) {
    directions = directions || DIRECTIONS;

    var directionNumber = getRandomInt(0, directions.length - 1);
    var direction = directions[directionNumber];

    if (!this.isDirectionFitting(x, y, shipSize, direction)) {
      directions = directions.filter(dir => dir !== direction);

      if (directions.length > 0) {
        return this.selectDirection(x, y, shipSize, directions);
      } else {
        return false; // Non direction fits with those coordinates
      }
    }

    return direction;
  }

  isDirectionFitting(x, y, shipSize, direction) {
    var shipOnGrid = false;
    var shipColliding = false;

    shipOnGrid = this.isShipOnGrid(x, y, shipSize, direction);
    if (shipOnGrid) {
      shipColliding = this.isShipColliding(x, y, shipSize, direction);
    }

    return shipOnGrid && !shipColliding;
  }

  isShipOnGrid(x, y, shipSize, direction) {
    var shipOnGrid = false;

    if (
      (direction === 'north' && y + (shipSize - 1) <= HEIGHT) ||
      (direction === 'south' && y - (shipSize - 1) >= 1) ||
      (direction === 'east' && x - (shipSize - 1) >= 1) ||
      (direction === 'ouest' && x + (shipSize - 1) <= WIDTH)
    ) {
      shipOnGrid = true;
    }

    return shipOnGrid;
  }

  isShipColliding(x, y, shipSize, direction) {
    var coordinates = [];
    var valueToAddX = 0;
    var valueToAddY = 0;

    if (direction === 'north') {
      valueToAddY = 1;
    } else if (direction === 'south') {
      valueToAddY = -1;
    } else if (direction === 'east') {
      valueToAddX = -1;
    } else if (direction === 'ouest') {
      valueToAddX = 1;
    }

    for (var i = 0; i < shipSize - 1; i++) {
      coordinates.push({
        x: x + (i * valueToAddX),
        y: y + (i * valueToAddY)
      });
    }

    var collidingCoordinates = coordinates.filter(coordinates => {
      return this.isShipOnCoordinates(coordinates.x, coordinates.y);
    });

    return collidingCoordinates.length > 0;
  }

  shoot(x, y) {
    var shipHasBeenTouched = false;

    if (!this.hasBeenShot(x, y)) {
      this.shotCoordinates.push({x, y});

      this.ships.forEach(ship => {
        var touched = ship.shotOnCoordinates(x, y);

        if (touched) {
          shipHasBeenTouched = true;
        }
      });

      if (shipHasBeenTouched) {
        this.hitCoordinates.push({x, y});
      }
    }
  }

  hasBeenShot(x, y) {
    var matchingCoordinates = this.shotCoordinates.filter(coordinates => coordinates.x === x && coordinates.y === y);

    return matchingCoordinates.length > 0;
  }

  wasAHit(x, y) {
    var matchingHits = this.hitCoordinates.filter(coordinates => coordinates.x === x && coordinates.y === y);

    return matchingHits.length > 0;
  }

  haveAllShipsDrowned() {
    var shipsLeft = this.ships.filter(ship => !ship.hasDrowned());

    return shipsLeft.length === 0;
  }
};

export default Grid;

// 015775286935
