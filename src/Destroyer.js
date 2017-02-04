import Ship from './Ship';

class Destroyer extends Ship {
  getType() {
    return 'Destroyer';
  }
  getSize() {
    return 4;
  }
};

export default Destroyer;
