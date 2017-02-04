import Ship from './Ship';

class Battleship extends Ship {
  getType() {
    return 'Battleship';
  }
  getSize() {
    return 5;
  }
};

export default Battleship;
