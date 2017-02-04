class Ship {
  constructor() {
    this.coordinates = [];
    this.coordinatesLeft = [];
  }

  getType() {
    return null;
  }
  getSize() {
    return 0;
  }

  setFrontCoordinates(x, y) {
    this.x = x;
    this.y = y;

    if (this.direction) {
      this.setCoordinates();
    }
  }

  setDirection(direction) {
    this.direction = direction;

    if (this.x && this.y) {
      this.setCoordinates();
    }
  }

  setCoordinates() {
    var valueToAddX = 0;
    var valueToAddY = 0;

    if (this.direction === 'north') {
      valueToAddY = 1;
    } else if (this.direction === 'south') {
      valueToAddY = -1;
    } else if (this.direction === 'east') {
      valueToAddX = -1;
    } else if (this.direction === 'ouest') {
      valueToAddX = 1;
    }

    for (var i = 0; i < this.getSize(); i++) {
      this.coordinates.push({
        x: this.x + (i * valueToAddX),
        y: this.y + (i * valueToAddY)
      });
    }

    this.coordinatesLeft = this.coordinates;
  }

  isOnCoordinates(x, y) {
    var matchingCoordinates = this.coordinates.filter(coordinates => coordinates.x === x && coordinates.y === y);

    return matchingCoordinates.length > 0;
  }

  shotOnCoordinates(x, y) {
    if (this.isOnCoordinates(x, y)) {
      this.coordinatesLeft = this.coordinatesLeft.filter(coordinates => coordinates.x !== x || coordinates.y !== y);

      return true;
    }

    return false;
  }

  hasDrowned() {
    return this.coordinatesLeft.length === 0;
  }
};

export default Ship;
