import Ship from './Ship';

var ship;

describe('Ship', () => {
  beforeEach(() => {
    ship = new Ship();
  });

  describe('constructor', () => {
    it('initializes the coordinates', () => {
      expect(ship.coordinates.length).toEqual(0);
    });
    it('initializes the coordinates left to hit', () => {
      expect(ship.coordinatesLeft.length).toEqual(0);
    });
  });

  describe('getType', () => {
    it('returns null', () => {
      expect(ship.getType()).toBe(null);
    });
  });

  describe('getSize', () => {
    it('returns 0', () => {
      expect(ship.getSize()).toBe(0);
    });
  });

  describe('setFrontCoordinates', () => {
    it('sets x', () => {
      ship.setFrontCoordinates('x coordinates', 'y coordinates');

      expect(ship.x).toEqual('x coordinates');
    });
    it('sets y', () => {
      ship.setFrontCoordinates('x coordinates', 'y coordinates');

      expect(ship.y).toEqual('y coordinates');
    });
    it('does not set coordinates if the direction is not set', () => {
      ship.setCoordinates = jest.fn();
      ship.setFrontCoordinates('x coordinates', 'y coordinates');

      expect(ship.setCoordinates).not.toHaveBeenCalled();
    });
    it('sets coordinates if the direction is set', () => {
      ship.setCoordinates = jest.fn();
      ship.direction = 'direction';
      ship.setFrontCoordinates('x coordinates', 'y coordinates');

      expect(ship.setCoordinates).toHaveBeenCalledTimes(1);
    });
  });

  describe('setDirection', () => {
    it('sets the direction', () => {
      ship.setDirection('direction');

      expect(ship.direction).toEqual('direction');
    });
    it('does not set coordinates if x is not set', () => {
      ship.setCoordinates = jest.fn();
      ship.y = 'y coordinates';
      ship.setDirection('direction');

      expect(ship.setCoordinates).not.toHaveBeenCalled();
    });
    it('does not set coordinates if y is not set', () => {
      ship.setCoordinates = jest.fn();
      ship.x = 'x coordinates';
      ship.setDirection('direction');

      expect(ship.setCoordinates).not.toHaveBeenCalled();
    });
    it('sets coordinates if the x and y coordinates are set', () => {
      ship.setCoordinates = jest.fn();
      ship.x = 'x coordinates';
      ship.y = 'y coordinates';
      ship.setDirection('direction');

      expect(ship.setCoordinates).toHaveBeenCalledTimes(1);
    });
  });

  describe('setCoordinates', () => {
    beforeEach(() => {
      ship.getSize = jest.fn(() => 3);
      ship.x = 5;
      ship.y = 5;
    });

    describe('sets the right coordinates when the direction is ', () => {
      it('north', () => {
        ship.direction = 'north';
        ship.setCoordinates();

        expect(ship.coordinates).toEqual([
          {x: 5, y: 5},
          {x: 5, y: 6},
          {x: 5, y: 7}
        ]);
      });
      it('south', () => {
        ship.direction = 'south';
        ship.setCoordinates();

        expect(ship.coordinates).toEqual([
          {x: 5, y: 5},
          {x: 5, y: 4},
          {x: 5, y: 3}
        ]);
      });
      it('east', () => {
        ship.direction = 'east';
        ship.setCoordinates();

        expect(ship.coordinates).toEqual([
          {x: 5, y: 5},
          {x: 4, y: 5},
          {x: 3, y: 5}
        ]);
      });
      it('ouest', () => {
        ship.direction = 'ouest';
        ship.setCoordinates();

        expect(ship.coordinates).toEqual([
          {x: 5, y: 5},
          {x: 6, y: 5},
          {x: 7, y: 5}
        ]);
      });
    });

    it('sets the coordinates left to hit as the start coordinates', () => {
      ship.direction = 'north';
      ship.setCoordinates();

      expect(ship.coordinates).toEqual(ship.coordinatesLeft);
    });
  });

  describe('isOnCoordinates', () => {
    it('returns true when the ship is present on the coordinates', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];

      expect(ship.isOnCoordinates(5, 5)).toBeTruthy();
    });
    it('returns false when the ship is not present on the coordinates', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];

      expect(ship.isOnCoordinates(5, 4)).toBeFalsy();
    });
  });

  describe('shotOnCoordinates', () => {
    it('returns true if the ship is on the given coordinates', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];
      ship.coordinatesLeft = [{x: 5, y: 5}, {x: 5, y: 6}];

      expect(ship.shotOnCoordinates(5, 5)).toBeTruthy();
    });
    it('removes the shot coordinates from the ones left to hit', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];
      ship.coordinatesLeft = [{x: 5, y: 5}, {x: 5, y: 6}];

      ship.shotOnCoordinates(5, 5);

      expect(ship.coordinatesLeft).toEqual([{x: 5, y: 6}]);
    });
    it('returns false if the ship is not on the given coordinates', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];
      ship.coordinatesLeft = [{x: 5, y: 5}, {x: 5, y: 6}];

      expect(ship.shotOnCoordinates(5, 4)).toBeFalsy();
    });
    it('does not remove the shot coordinates from the ones left to hit', () => {
      ship.coordinates = [{x: 5, y: 5}, {x: 5, y: 6}];
      ship.coordinatesLeft = [{x: 5, y: 5}, {x: 5, y: 6}];

      ship.shotOnCoordinates(5, 4);

      expect(ship.coordinatesLeft).toEqual([{x: 5, y: 5}, {x: 5, y: 6}]);
    });
  });

  describe('hasDrowned', () => {
    it('returns true if no coordinates left to hit', () => {
      ship.coordinatesLeft = [];

      expect(ship.hasDrowned()).toBeTruthy();
    });
    it('returns false if there are coordinates left to hit', () => {
      ship.coordinatesLeft = [{x: 5, y: 5}];

      expect(ship.hasDrowned()).toBeFalsy();
    });
  });
});
