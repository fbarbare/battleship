import React, { Component } from 'react';
import Grid from './Grid';

const styles = {
  container: {
    textAlign: 'center'
  },
  app: {
    display: 'inline-block'
  },

  table: {
    border: 'solid 1px black'
  },

  cell: {
    width: '20px',
    height: '20px',
    border: 'solid 1px black',
    cursor: 'pointer',
    textAlign: 'center'
  },

  point: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'black',
    width: '70%',
    height: '70%',
    overflow: 'hidden'
  }
};

class App extends Component {
  componentWillMount() {
    this.newGame = this.newGame.bind(this);
    this.onCellClicked = this.onCellClicked.bind(this);

    this.newGame();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.app}>
          <h1>Battleship game!</h1>
          <div><button onClick={this.newGame}>New Game!</button></div>
          <div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  {this.state.gridWidthArray.map(columnNumber => {
                    var text = columnNumber || '';

                    return (
                      <th key={'head-' + columnNumber}>{text}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.gridHeightArray.map(rowNumber => {
                  var text = rowNumber || '';

                  return (
                    <tr key={'row-' + rowNumber}>
                      <th>{text}</th>
                      {this.state.gridWidthArray.map(columnNumber => {
                        var hasBeenShot = this.grid.hasBeenShot(columnNumber, rowNumber);
                        var wasAHit = false;

                        if (hasBeenShot) {
                          wasAHit = this.grid.wasAHit(columnNumber, rowNumber);
                        }

                        return (
                          <td key={'row-' + rowNumber + '-column-' + columnNumber}>
                            <div style={styles.cell} onClick={() => { this.onCellClicked(columnNumber, rowNumber); }}>
                              {hasBeenShot
                                ? <div style={styles.point}>
                                    <div style={{width: '100%', height: '100%', backgroundColor: wasAHit ? 'red' : '#5db4ff'}}></div>
                                  </div>
                                : null
                              }
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  newGame() {
    this.grid = new Grid();

    this.grid.addShip('Battleship');
    this.grid.addShip('Destroyer');
    this.grid.addShip('Destroyer');

    var gridWidthArray = [];
    var gridHeightArray = [];

    for (var i = 1; i <= this.grid.getWidth(); i++) {
      gridWidthArray.push(i);
    }
    for (var j = 1; j <= this.grid.getHeight(); j++) {
      gridHeightArray.push(j);
    }

    this.setState({ gridWidthArray, gridHeightArray });
  }

  onCellClicked(x, y) {
    this.grid.shoot(x, y);
    this.forceUpdate();

    if (this.grid.haveAllShipsDrowned()) {
      alert('You WON!!!!');
    }
  }

}

export default App;
