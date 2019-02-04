import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Link } from "react-router-dom";

class RoomPicker extends React.Component {
  handleClicked() {}
  render() {
    return (
      <div>
        <Button variant="outline-primary" className="create-btn">
          Create Room
        </Button>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/play/room1">
                  <Button
                    className="room-btn"
                    size="lg"
                    variant="outline-info"
                    block
                  >
                    Room#1
                  </Button>
                </Link>
              </td>
              <td>
                <Link to="/play/room2">
                  <Button
                    className="room-btn"
                    size="lg"
                    variant="outline-info"
                    block
                  >
                    Room#2
                  </Button>
                </Link>
              </td>
              <td>
                <Link to="/play/room3">
                  <Button
                    className="room-btn"
                    size="lg"
                    variant="outline-info"
                    block
                  >
                    Room#3
                  </Button>
                </Link>
              </td>
              <td>
                <Link to="/play/room4">
                  <Button
                    className="room-btn"
                    size="lg"
                    variant="outline-info"
                    block
                  >
                    Room#4
                  </Button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RoomPicker;
