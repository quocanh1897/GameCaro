import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class RoomPicker extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < 100; i++) {
      let link = "/play/room"+i;
      rows.push(
        <Link to={link} key={i}>
          <Button className="room-btn" size="lg" variant="outline-info" block>
            Room#{i<10?'0'+i:i}
          </Button>
        </Link>
      );
    }

    return (
      <div>
        <div className="line">
          <Button variant="outline-primary" className="create-btn">
            Create Room
          </Button>
        </div>
        <div className="wrapper-room-btn">
          {rows}

        </div>
      </div>
    );
  }
}

export default RoomPicker;
