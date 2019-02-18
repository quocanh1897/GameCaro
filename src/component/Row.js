import React from "react";
import Cell from "./Cell";

export default class Row extends React.Component {
  
  render() {
    let arr = [];
    let { row } = this.props;
    for (let i = 0; i < row.length; i++) {
      arr.push(
        <Cell
          id={this.props.id}
          value={row[i]}
          key={i}
          y={this.props.y}
          x={i}
          isMyTurn={this.props.isMyTurn}
          isX={this.props.isX}
          oppID={this.props.oppID}
          room={this.props.room}
        />
      );
    }

    return <div className="row">{arr}</div>;
  }
}
