import React, { Component } from "react";
class Board extends Component {
  state = { boardDS: [], message: "", currentPlayer: "", gameOver: "" };

  constructor(props) {
    super(props);
    let updateState = { ...this.state };
    let dataStruct = Array(6).fill("0");
    dataStruct.forEach((item, i) => {
      dataStruct[i] = [].concat(Array(7).fill("0"));
    });
    updateState.boardDS = dataStruct;
    updateState.message = "Game in Progress";
    updateState.gameOver = false;
    updateState.currentPlayer = "Player 1";
    this.state = updateState;
  }

  handlePlay = columnIndex => {
    // console.log("handle play implementation");

    let { boardDS, message, currentPlayer, gameOver } = { ...this.state };
    if (!gameOver) {
      for (let index = 5; index >= 0; index--) {
        if (boardDS[index][columnIndex] === "0") {
          boardDS[index][columnIndex] =
            currentPlayer === "Player 1" ? "1" : "2";
          break;
        }
      }

      let drawStatus = drawValidation(boardDS);
      console.log("darw", drawStatus);
      if (drawStatus) {
        gameOver = true;
        message = "Game Draw";
      } else {
        let result = runAll(boardDS);
        if (result === (currentPlayer === "Player 1" ? "1" : "2")) {
          message = (result === "1" ? "Player 1" : "Player 2") + " Wins!!!";
          gameOver = true;
        } else {
          currentPlayer = togglePlayer(currentPlayer);
        }
        // console.log("message", message);
        this.setState({ boardDS, currentPlayer, message, gameOver });
        // console.log("state", this.state);
      }
    }
  };

  // init game board
  handleInit = () => {
    // console.log("reload board");
    let { boardDS, message, currentPlayer, gameOver } = { ...this.state };

    let dataStruct = Array(6).fill("0");
    dataStruct.forEach((item, i) => {
      dataStruct[i] = [].concat(Array(7).fill("0"));
    });
    boardDS = dataStruct;
    message = "Game in Progress";
    gameOver = false;
    currentPlayer = "Player 1";
    this.setState({ boardDS, message, currentPlayer, gameOver });
  };
  // render method
  render() {
    let { boardDS, message, currentPlayer, gameOver } = this.state;
    const tableStyle = {
      background: "#536170",
      color: "#ffff",
      cursor: "pointer"
    };

    return (
      <div>
        <h3
          style={{ textAlign: "center", paddingTop: "10px", color: "#495219" }}
        >
          Chingu Solo Project - Connect 4
        </h3>
        <div
          style={{
            display: "flex",
            height: "400px",
            justifyContent: "center"
          }}
        >
          <div style={{ padding: "0px 20px" }}>
            <div style={{ color: "#0099CC" }}>
              <h3 style={{ wordWrap: "break-word" }}>
                {!gameOver ? currentPlayer + " Playing" : message + ""}
              </h3>
            </div>
            <div style={{ paddingTop: "30px" }} />
            <div style={{ display: "flex" }}>
              <div>
                <h3 style={rowStyle11} />
              </div>
              <div>
                <h3
                  style={{
                    textAlign: "center",
                    margin: "0",
                    paddingLeft: "7px"
                  }}
                >
                  Player 1
                </h3>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }} />
            <div style={{ display: "flex" }}>
              <div>
                <h3 style={rowStyle21} />
              </div>
              <div>
                <h3
                  style={{
                    textAlign: "center",
                    margin: "0",
                    paddingLeft: "7px"
                  }}
                >
                  Player 2
                </h3>
              </div>
            </div>
            <div style={{ paddingTop: "60px" }} />
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              <a
                onClick={this.handleInit}
                style={{
                  color: "#CCE5CC",
                  background: "#1D2553",
                  padding: "5px 15px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Restart Game
              </a>
            </div>
          </div>
          <div style={{}}>
            <table style={tableStyle}>
              <tbody>
                {boardDS.map((row, i) => (
                  <Row key={i} row={row} play={this.handlePlay} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

// Row Component
const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => {
        return <Cell key={i} cellValue={cell} columnIndex={i} play={play} />;
      })}
    </tr>
  );
};

// Cell Component
const Cell = ({ cellValue, columnIndex, play }) => {
  return (
    <td
      style={{
        textAlign: "center",
        backgroundColor: "#f4f4f4",
        color: "#444",
        borderRadius: "5px"
      }}
      onClick={() => play(columnIndex)}
    >
      <div
        style={
          cellValue === "0"
            ? rowStyle0
            : cellValue === "1"
            ? rowStyle1
            : rowStyle2
        }
      />
    </td>
  );
};

// cell CSS
const rowStyle1 = {
  background: "#065535",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  margin: "auto",
  textAlign: "center"
};
const rowStyle2 = {
  background: "#0B3D91",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  margin: "auto",
  textAlign: "center"
};
const rowStyle11 = {
  background: "#065535",
  width: "40px",
  height: "40px",
  color: "#fff",
  textAlign: "center",
  borderRadius: "50%",
  margin: "auto",
  textAlign: "center"
};
const rowStyle21 = {
  background: "#0B3D91",
  width: "40px",
  height: "40px",
  color: "#fff",
  borderRadius: "50%",
  margin: "auto",
  textAlign: "center"
};
const rowStyle0 = {
  background: "inherit",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  margin: "auto",
  textAlign: "center"
};
// function to toggle player
const togglePlayer = currentPlayer => {
  return currentPlayer === "Player 1" ? "Player 2" : "Player 1";
};

// Scan row wise till 3rd index
const horizontalValidation = boardDS => {
  for (let r = 5; r >= 0; r--) {
    for (let c = 0; c <= 3; c++) {
      if (boardDS[r][c] !== "0") {
        if (
          boardDS[r][c] === boardDS[r][c + 1] &&
          boardDS[r][c] === boardDS[r][c + 2] &&
          boardDS[r][c] === boardDS[r][c + 3]
        )
          return boardDS[r][c];
      }
    }
  }
};

// Scan DS column wise till 2nd index
const verticalValidation = boardDS => {
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c <= 6; c++) {
      if (boardDS[r][c] !== "0") {
        if (
          boardDS[r][c] === boardDS[r + 1][c] &&
          boardDS[r][c] === boardDS[r + 2][c] &&
          boardDS[r][c] === boardDS[r + 3][c]
        )
          return boardDS[r][c];
      }
    }
  }
};

// diagonal right check
const diagonalRightValidation = boardDS => {
  for (let r = 3; r <= 5; r++) {
    for (let c = 0; c < 3; c++) {
      if (boardDS[r][c] !== "0") {
        if (
          boardDS[r][c] === boardDS[r - 1][c + 1] &&
          boardDS[r][c] === boardDS[r - 2][c + 2] &&
          boardDS[r][c] === boardDS[r - 3][c + 3]
        )
          return boardDS[r][c];
      }
    }
  }
};
// diagonal left check
const diagonalLeftValidation = boardDS => {
  for (let r = 3; r <= 5; r++) {
    for (let c = 3; c <= 6; c++) {
      if (boardDS[r][c] !== "0") {
        if (
          boardDS[r][c] === boardDS[r - 1][c - 1] &&
          boardDS[r][c] === boardDS[r - 2][c - 2] &&
          boardDS[r][c] === boardDS[r - 3][c - 3]
        )
          return boardDS[r][c];
      }
    }
  }
};

// check draw condition
const drawValidation = boardDS => {
  for (let r = 0; r <= 5; r++) {
    for (let c = 0; c <= 6; c++) {
      if (boardDS[r][c] === "0") return false;
    }
  }
};

// run all checks
const runAll = boardDS => {
  return (
    horizontalValidation(boardDS) ||
    verticalValidation(boardDS) ||
    diagonalRightValidation(boardDS) ||
    diagonalLeftValidation(boardDS)
  );
};

export default Board;
