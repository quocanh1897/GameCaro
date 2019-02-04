import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RoomPicker from "./component/RoomPicker";
import Board from "./component/Board";

const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
    <Link to="/">
      <Navbar.Brand>Caro</Navbar.Brand>
    </Link>
    </Navbar>
  );
};


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
      width: 10,
      isx: true,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="game">
          <Route path="/" component={NavigationBar} />
          <Route path="/" component={RoomPicker} exact />
          <Route
            path="/play/:room"
            render={props => <Board height={this.state.height}
            width={this.state.width} {...props}/>}
            
          />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
