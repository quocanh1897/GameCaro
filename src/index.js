import React, { Component } from "react";
import ReactDOM from "react-dom";
import Board from "./component/Board";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 2,
      width: 2,
      isx: true,
    };
  }
  
  render() {
  
    return (
      <div className="game">
        <div className="game-header">
          
        </div>
        <div className="game-board">{
          <Board height={this.state.height} width={this.state.width} isx={this.state.isx} />

        }</div>

      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
