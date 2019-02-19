import React from "react";
import Cell from "./Cell";

export default class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      room: this.props.room,
      isMyTurn: this.props.isMyTurn,
      isX: this.props.isX,
      oppID: this.props.oppID,
    };
  }

  render() {
    let arr = [];
    let { row } = this.props;
    for (let i = 0; i < row.length; i++) {
      arr.push(
        <Cell
          value={row[i]}
          key={i}
          y={this.props.y}
          x={i}
          id={this.state.id}
          isMyTurn={this.state.isMyTurn}
          isX={this.state.isX}
          oppID={this.state.oppID}
          room={this.state.room}
        />
      );
    }

    return <div className="row">{arr}</div>;
  }
}
