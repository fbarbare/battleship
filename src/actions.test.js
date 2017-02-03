const actions = require('./actions');

describe('actions', () => {
  describe('positionShips', () => {
    var positionShipFunc = actions.positionShip;

    beforeEach(() => {
      actions.positionShip = jest.fn();
    });
    afterEach(() => {
      actions.positionShip = positionShipFunc;
    });

    it('positions every ship', () => {
      actions.positionShips();

      expect(actions.positionShip).toHaveBeenCalledTimes(3);
    });
  });
  describe('positionShip', () => {
    var getShipDirectionFunc = actions.getShipDirection;

    beforeEach(() => {
      actions.getShipDirection = jest.fn(() => 'test');
    });
    afterEach(() => {
      actions.getShipDirection = getShipDirectionFunc;
    });

    it('sets the front X of the new ship within the grid', () => {
      var ship = {size: 4};

      actions.positionShip(ship, []);

      expect(ship.frontX).toBeGreaterThanOrEqual(1);
      expect(ship.frontX).toBeLessThanOrEqual(10);
    });
    it('sets the front Y of the new ship within the grid', () => {
      var ship = {size: 4};

      actions.positionShip(ship, []);

      expect(ship.frontY).toBeGreaterThanOrEqual(1);
      expect(ship.frontY).toBeLessThanOrEqual(10);
    });
    it('gets the direction once', () => {
      var ship = {size: 4};
      var positionnedShips = [];

      actions.positionShip(ship, positionnedShips);

      expect(actions.getShipDirection).toHaveBeenCalledTimes(1);
    });
    it('sets the direction of the new ship within the grid', () => {
      var ship = {size: 4};

      actions.positionShip(ship, []);

      expect(ship.direction).toEqual('test');
    });
    it('sets different points if no direction can be found', () => {
      var valueReturned = false;
      actions.getShipDirection = jest.fn(() => {
        if (!valueReturned) {
          valueReturned = true;
          return null;
        }

        return 'test';
      });

      var ship = {size: 4};

      actions.positionShip(ship, []);

      expect(actions.getShipDirection).toHaveBeenCalledTimes(2);
      expect(actions.getShipDirection.mock.calls[0]).not.toEqual(actions.getShipDirection.mock.calls[1]);
    });
  });

  describe('isShipInGrid', () => {
    describe('the ship is out of the grid with direction', () => {
      it('north', () => {
        var result = actions.isShipInGrid(5, 8, 4, 'north');

        expect(result).toBeFalsy();
      });
      it('south', () => {
        var result = actions.isShipInGrid(5, 3, 4, 'south');

        expect(result).toBeFalsy();
      });
      it('east', () => {
        var result = actions.isShipInGrid(3, 5, 4, 'east');

        expect(result).toBeFalsy();
      });
      it('ouest', () => {
        var result = actions.isShipInGrid(8, 5, 4, 'ouest');

        expect(result).toBeFalsy();
      });
    });
    describe('the ship is in the grid with direction', () => {
      it('north', () => {
        var result = actions.isShipInGrid(5, 7, 4, 'north');

        expect(result).toBeTruthy();
      });
      it('south', () => {
        var result = actions.isShipInGrid(5, 4, 4, 'south');

        expect(result).toBeTruthy();
      });
      it('east', () => {
        var result = actions.isShipInGrid(4, 5, 4, 'east');

        expect(result).toBeTruthy();
      });
      it('ouest', () => {
        var result = actions.isShipInGrid(6, 5, 4, 'ouest');

        expect(result).toBeTruthy();
      });
    });
  });

  describe('isShipOverlapingPositionnedShips', () => {
    describe('When the ship will be overlapping an other', () => {
      it('returns true', () => {
        var result = actions.isShipOverlapingPositionnedShips(5, 5, 4, 'north', [{frontX: 4, frontY: 6, size: 4, direction: 'ouest'}]);

        expect(result).toBeTruthy();
      });
    });
    describe('When the ship is not overlapping an other', () => {
      it('returns false', () => {
        var result = actions.isShipOverlapingPositionnedShips(5, 5, 4, 'north', [{frontX: 4, frontY: 4, size: 4, direction: 'ouest'}]);

        expect(result).toBeFalsy();
      });
    });
  });

  describe('getShipPositions', () => {
    describe('We get the positions of the boat going ', () => {
      it('north', () => {
        var result = actions.getShipPositions(5, 5, 4, 'north');

        expect(result).toEqual([{x:5, y:5}, {x:5, y:6}, {x:5, y:7}, {x:5, y:8}]);
      });
      it('south', () => {
        var result = actions.getShipPositions(5, 5, 4, 'south');

        expect(result).toEqual([{x:5, y:5}, {x:5, y:4}, {x:5, y:3}, {x:5, y:2}]);
      });
      it('east', () => {
        var result = actions.getShipPositions(5, 5, 4, 'east');

        expect(result).toEqual([{x:5, y:5}, {x:4, y:5}, {x:3, y:5}, {x:2, y:5}]);
      });
      it('ouest', () => {
        var result = actions.getShipPositions(5, 5, 4, 'ouest');

        expect(result).toEqual([{x:5, y:5}, {x:6, y:5}, {x:7, y:5}, {x:8, y:5}]);
      });
    });
  });
});
