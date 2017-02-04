import Destroyer from './Destroyer';

var destroyer;

describe('Destroyer', () => {
  beforeEach(() => {
    destroyer = new Destroyer();
  });

  describe('getType', () => {
    it('returns the destroyer type', () => {
      expect(destroyer.getType()).toEqual('Destroyer');
    });
  });

  describe('getSize', () => {
    it('returns the destroyer size', () => {
      expect(destroyer.getSize()).toBe(4);
    });
  });
});
