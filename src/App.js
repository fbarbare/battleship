import React, { Component } from 'react';
import actions from './actions';
import Cell from './Cell';
import './App.css';

const GRID_WIDTH = parseInt(process.env.REACT_APP_GRID_WIDTH, 10);
const GRID_HEIGHT = parseInt(process.env.REACT_APP_GRID_HEIGHT, 10);

var gridWidthArray = [];
var gridHeightArray = [];

for (var i = 1; i <= GRID_WIDTH; i++) {
  gridWidthArray.push(i);
}
for (var j = 1; j <= GRID_HEIGHT; j++) {
  gridHeightArray.push(j);
}

const styles = {
  table: {
    border: 'solid 1px black'
  }
};

class App extends Component {
  componentWillMount() {
    actions.positionShips();
  }

  render() {
    return (
      <div className="app">
        <h1>Battleship game!</h1>
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th></th>
                {gridWidthArray.map(columnNumber => {
                  var text = columnNumber || '';

                  return (
                    <th key={'head-' + columnNumber}>{text}</th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {gridHeightArray.map(rowNumber => {
                var text = rowNumber || '';

                return (
                  <tr key={'row-' + rowNumber}>
                    <th>{text}</th>
                    {gridWidthArray.map(columnNumber => {

                      return (
                        <td key={'row-' + rowNumber + '-column-' + columnNumber}>
                          <Cell x={columnNumber} y={rowNumber} />
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
    );
  }
}

export default App;
