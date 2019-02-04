import React from "react";
import Cell from "./Cell";

export default class Row extends React.Component {
  
  render() {
    let arr = [];
    let { row } = this.props;
    console.log(row);
    for (let i = 0; i < row.length; i++) {
      arr.push(
        <Cell
          value={row[i]}
          key={i}
        />
      );
    }

    return <div className="row">{arr}</div>;
  }
}
