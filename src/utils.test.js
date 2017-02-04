import * as utils from './utils';

describe('getRandomInt', () => {
  it('always returns an int between the 2 given parameters', () => {
    for (var i = 0; i < 10; i++) {
      let int = utils.getRandomInt(1, 5);

      expect(int).toBeGreaterThanOrEqual(1);
      expect(int).toBeLessThanOrEqual(5);
    }
  });
});
