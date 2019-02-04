import React from "react";
import Row from "./Row";

export default class Board extends React.Component {
  /* Helper Functions */

  // Gets initial board data
  initBoardData(height, width) {
    let data = this.createEmptyArray(height, width);
    // data = this.plantMines(data, height, width, mines);
    // data = this.getNeighbours(data, height, width);
    return data;
  }

  createEmptyArray(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isX: true,
          isClicked: false
        };
      }
    }
    return data;
  }

  
  renderBoard(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(<Row row={data[i]} key={i} />);
    }

    return <div>{arr}</div>;
  }

  render() {
    let boardData = this.initBoardData(this.props.height, this.props.width);
    return <div className="board" >{this.renderBoard(boardData)}</div>;
  }
}
