import React, { Component } from 'react';
import actions from './actions';

const SUCCESS_COLOR = 'red';
const FAIL_COLOR = '#4f8ef1';

const styles = {
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

class Cell extends Component {
  componentWillMount() {
    this.setState({
      clicked: false
    });

    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div style={styles.cell} onClick={this.onClick}>
        {this.state.clicked
          ? <div style={styles.point}>
              <div style={{width: '100%', height: '100%', backgroundColor: this.state.color}}></div>
            </div>
          : null
        }
      </div>
    );
  }

  onClick() {
    if (!this.state.clicked) {
      let isShipOnCell = actions.isShipOnCoordinates(this.props.x, this.props.y);
      let color = FAIL_COLOR;

      if (isShipOnCell) {
        color = SUCCESS_COLOR;
      }

      this.setState({
        clicked: true,
        color: color
      });
    }
  }
}

export default Cell;
