import Grid from './Grid';

var grid;

describe('Grid', () => {
  beforeEach(() => {
    grid = new Grid();
  });

  describe('constructor', () => {
    it('sets the ships', () => {
      expect(grid.ships).toEqual([]);
    });
    it('sets the shot coordinates', () => {
      expect(grid.shotCoordinates).toEqual([]);
    });
    it('sets hit coordinates', () => {
      expect(grid.hitCoordinates).toEqual([]);
    });
  });

  describe('getWidth', () => {
    it('returns the width of the grid', () => {
      expect(grid.getWidth()).toBe(10);
    });
  });

  describe('getHeight', () => {
    it('returns the height of the grid', () => {
      expect(grid.getHeight()).toBe(10);
    });
  });

  describe('isShipOnCoordinates', () => {
    it('returns false if no ship is on the given coordinates', () => {
      grid.ships = [{isOnCoordinates: () => false}];

      expect(grid.isShipOnCoordinates()).toBeFalsy();
    });
    it('returns false if no ship is on the given coordinates', () => {
      grid.ships = [{isOnCoordinates: () => true}];

      expect(grid.isShipOnCoordinates()).toBeTruthy();
    });
  });

  describe('addShip', () => {
  });

  describe('generateCoordinates', () => {
    it('returns coordinates', () => {
      var result = grid.generateCoordinates();

      expect(result.x).toBeGreaterThanOrEqual(1);
      expect(result.x).toBeLessThanOrEqual(10);

      expect(result.y).toBeGreaterThanOrEqual(1);
      expect(result.y).toBeLessThanOrEqual(10);
    });
    it('checks is there is already a ship on those coordinates', () => {
      grid.isShipOnCoordinates = jest.fn(() => false);

      grid.generateCoordinates();

      expect(grid.isShipOnCoordinates).toHaveBeenCalledTimes(1);
    });
    it('generates different coordinates if there is already a ship on it', () => {
      grid.isShipOnCoordinates = jest.fn(() => false);
      grid.isShipOnCoordinates.mockReturnValueOnce(true);

      grid.generateCoordinates();

      expect(grid.isShipOnCoordinates).toHaveBeenCalledTimes(2);
      expect(grid.isShipOnCoordinates.mock.calls[0]).not.toBe(grid.isShipOnCoordinates.mock.calls[1]);
    });
  });

  describe('selectDirection', () => {
  });

  describe('isDirectionFitting', () => {
    it('returns false if the ship is not on the grid', () => {
      grid.isShipOnGrid = jest.fn(() => false);

      expect(grid.isDirectionFitting(5, 5, 3, 'north')).toBeFalsy();
    });
    it('returns false if the ship is colliding with another one', () => {
      grid.isShipOnGrid = jest.fn(() => true);
      grid.isShipColliding = jest.fn(() => true);

      expect(grid.isDirectionFitting(1, 1, 3, 'south')).toBeFalsy();
    });
    it('returns true if both ship fits on the grid and there is no collision', () => {
      grid.isShipOnGrid = jest.fn(() => true);
      grid.isShipColliding = jest.fn(() => false);

      expect(grid.isDirectionFitting(1, 1, 3, 'south')).toBeTruthy();
    });
  });

  describe('isShipColliding', () => {
    it('returns true if a ship is already on those coordinates', () => {
      grid.isShipOnCoordinates = jest.fn(() => true);

      expect(grid.isShipColliding(5, 5, 3, 'north')).toBeTruthy();
    });
    it('returns false if a ship is already on those coordinates', () => {
      grid.isShipOnCoordinates = jest.fn(() => false);

      expect(grid.isShipColliding(5, 5, 3, 'north')).toBeFalsy();
    });
  });

  describe('shoot', () => {
    it('does not add the coordinates to the sot ones if they had already been shot', () => {
      grid.hasBeenShot = jest.fn(() => true);
      grid.shotCoordinates = [];

      grid.shoot(5, 5);

      expect(grid.shotCoordinates).toEqual([]);
    });

    it('adds the coordinates to the shot ones', () => {
      grid.hasBeenShot = jest.fn(() => false);
      grid.shotCoordinates = [];

      grid.shoot(5, 5);

      expect(grid.shotCoordinates).toEqual([{x: 5, y: 5}]);
    });
    it('checks if a ship was hit', () => {
      grid.hasBeenShot = jest.fn(() => false);
      grid.shotCoordinates = [];
      grid.hitCoordinates = [];
      grid.ships = [{shotOnCoordinates: jest.fn(() => false)}];

      grid.shoot(5, 5);

      expect(grid.ships[0].shotOnCoordinates).toHaveBeenCalledTimes(1);
    });
    it('does not add the coordinates to hit ones if no ship was hit', () => {
      grid.hasBeenShot = jest.fn(() => false);
      grid.shotCoordinates = [];
      grid.hitCoordinates = [];
      grid.ships = [{shotOnCoordinates: jest.fn(() => false)}];

      grid.shoot(5, 5);

      expect(grid.hitCoordinates).toEqual([]);
    });
    it('adds the coordinates to hit ones if a ship was hit', () => {
      grid.hasBeenShot = jest.fn(() => false);
      grid.shotCoordinates = [];
      grid.hitCoordinates = [];
      grid.ships = [{shotOnCoordinates: jest.fn(() => true)}];

      grid.shoot(5, 5);

      expect(grid.hitCoordinates).toEqual([{x: 5, y: 5}]);
    });
  });

  describe('hasBeenShot', () => {
    it('returns true if the coordinates have already been bombed', () => {
      grid.shotCoordinates = [{x: 5, y: 5}];

      expect(grid.hasBeenShot(5, 5)).toBeTruthy();
    });
    it('returns false if the coordinates have not already been bombed', () => {
      grid.shotCoordinates = [{x: 5, y: 5}];

      expect(grid.hasBeenShot(5, 4)).toBeFalsy();
    });
  });

  describe('wasAHit', () => {
    it('returns true if the coordinates have already been bombed and there was a ship on it', () => {
      grid.hitCoordinates = [{x: 5, y: 5}];

      expect(grid.wasAHit(5, 5)).toBeTruthy();
    });
    it('returns false if the coordinates have not already been bombed and there was a ship on it', () => {
      grid.hitCoordinates = [{x: 5, y: 5}];

      expect(grid.wasAHit(5, 4)).toBeFalsy();
    });
  });

  describe('haveAllShipsDrowned', () => {
    it('returns true if all the ships have drowned', () => {
      grid.ships = [{hasDrowned: () => true}];

      expect(grid.haveAllShipsDrowned()).toBeTruthy();
    });
    it('returns false if not all ships have drowned', () => {
      grid.ships = [{hasDrowned: () => false}];

      expect(grid.haveAllShipsDrowned()).toBeFalsy();
    });
  });

});
