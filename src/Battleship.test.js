import Battleship from './Battleship';

var battleship;

describe('Battleship', () => {
  beforeEach(() => {
    battleship = new Battleship();
  });

  describe('getType', () => {
    it('returns the battleship type', () => {
      expect(battleship.getType()).toEqual('Battleship');
    });
  });

  describe('getSize', () => {
    it('returns the battleship size', () => {
      expect(battleship.getSize()).toBe(5);
    });
  });
});
