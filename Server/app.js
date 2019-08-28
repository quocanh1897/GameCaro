const express = require("express");
const app = express();

const axios = require("axios");

const server = require("http").Server(app);
const io = require("socket.io")(server);

const tools = require("./tools");
server.listen(4001);

let connection = {};
let gameBoard = {};
let listConnection = [];
let player = {};
let readyPlayer = {};
let roomList = {};

const row = 20;
const col = 20;

io.on("connection", socket => {
  listConnection.push(socket.id);
  console.log(listConnection);
  socket.on("disconnect", () => {
    console.log("disconnected with " + socket.id);

  });

  socket.on("number-of-room", req => {
    socket.emit("number-of-room-from-server", player)
  })

  socket.on("create-room", req => {
    let res = {
      roomNumber: Object.keys(player).length + 1
    };
    socket.emit("create-room-from-server", res);
  })

  socket.on("emoji", data => {
    console.log(data);
    let res = {
      emoji: data.emoji
    };
    io.to(data.id).emit("emoji-from-server", res);
    io.to(data.oppID).emit("emoji-from-server", res);
    
  });

  socket.on("from-client", data => {
    room = data.room;
    player[room] = {
      idSocket: socket.id,
      isReady: false,
      name: data.playerName
    };

    if (data.header == "init") {
      player[room].isReady = true;
      io.sockets.emit("number-of-room-from-server", player); //broadcast all socket connections

      readyPlayer[room] = readyPlayer[room] || [];
      readyPlayer[room].push({
        id: socket.id,
        name: data.playerName
      });
      gameBoard[room] = initGameBoard();

      console.log(player[room].name + " in " + room + " request a new game");

      if (readyPlayer[room].length % 2 == 0) {
        let lastIdx = readyPlayer[room].length - 1;
        for (let i = lastIdx; i >= 0; i--) {
          let res = {
            header: "game-start",
            id: readyPlayer[room][i].id,
            isMyTurn: i == lastIdx ? true : false,
            isX: i == lastIdx ? true : false,
            opponent: i == lastIdx ?
              readyPlayer[room][lastIdx - 1].id :
              readyPlayer[room][lastIdx].id,
            opponentName: i == lastIdx ?
              readyPlayer[room][lastIdx - 1].name :
              readyPlayer[room][lastIdx].name
          };
          readyPlayer[room][i].isMyTurn = res.isMyTurn;
          readyPlayer[room][i].isX = res.isX;
          io.to(readyPlayer[room][i].id).emit("from-server", res);
        }
        console.log(
          "game: " +
          readyPlayer[room][0].name +
          " vs " +
          readyPlayer[room][1].name
        );
      }
    }
    if (data.header == "update-check") {
      //console.log(data);
      gameBoard[room][data.y][data.x] = data.isX ? "x" : "o";

      // console.log(gameBoard[room]);
      if (tools.checkWin(gameBoard[room], row, col, data.y, data.x)) {
        console.log("WINNER: " + data.id);
        let res = {
          header: "check-win-from-server",
          winner: data.id
        };
        io.to(data.id).emit("from-server", res);
        io.to(data.oppID).emit("from-server", res);
      }

      let lastIdx = readyPlayer[room].length - 1;
      let resLast = {
        header: "update-check-from-server",
        x: data.x,
        y: data.y,
        isMyTurn: true, //next turn will be oppID
        isX: data.isX // to set data at client to X or O
      };
      io.to(data.oppID).emit("from-server", resLast);

      let res2 = resLast;
      res2.isMyTurn = false;

      io.to(data.id).emit("from-server", res2);
      //socket.emit("from-server", res);
    }
  });
});

function initGameBoard() {
  let data = [];
  for (let i = 0; i < row; i++) {
    data.push([]);
    for (let j = 0; j < col; j++) {
      data[i][j] = "_";
    }
  }
  return data;
}