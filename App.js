import React from "react";
import "./App.css";


function Square(props) {
  let x = colors1[props.value];
  return (
    <button key={props.x + "cxxzz"} className={x} onClick={props.onClick} />
  );
}

function winnerCheck(squares)
{
  let len = squares.length;
  let theColor = squares[0][0];
  for(let i= 0;i<len;i++)
    for(let j=0;j<len;j++)
          if(squares[i][j]!==theColor)
          {
            return 0;
          }
  return 1;
}

function calculate(pickColor, squares) {

  let theColor = squares[0][0];
  if (pickColor === theColor) return squares;
  let len = squares.length;
  var visited = Array(len)
    .fill(0)
    .map(() => Array(len).fill(0));
  floodFill(squares, 0, 0, pickColor, visited, theColor);
  return squares;
}



function floodFill(squares, i, j, pickColor, visited, theColor) {
  var gridSize = 16;
  visited[i][j] = 1;
  squares[i][j] = pickColor;
  if (i - 1 >= 0 && visited[i - 1][j] !== 1 && squares[i - 1][j] === theColor) {
    floodFill(squares, i - 1, j, pickColor, visited, theColor);
  }
  if (
    i + 1 < gridSize &&
    visited[i + 1][j] !== 1 &&
    squares[i + 1][j] === theColor
  ) {
    floodFill(squares, i + 1, j, pickColor, visited, theColor);
  }
  if (
    j + 1 < gridSize &&
    visited[i][j + 1] !== 1 &&
    squares[i][j + 1] === theColor
  ) {
    floodFill(squares, i, j + 1, pickColor, visited, theColor);
  }
  if (j - 1 >= 0 && visited[i][j - 1] !== 1 && squares[i][j - 1] === theColor) {
    floodFill(squares, i, j - 1, pickColor, visited, theColor);
  }
}


function initializeSquares() {
  var gridSize = 16;
  var squares = [];
  for (let i = 0; i < gridSize; i++) {
    var subArray = [];
    for (let j = 0; j < gridSize; j++) {
      var x = Math.floor(Math.random() * 100) % 5;
      subArray.push(x);
    }
    squares.push(subArray);
  }
  return squares;
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares1: initializeSquares(),
      noOfMoves1: 0,
      previous:20,
      winner:0
    };
  }
  handleClick(i) {
    if(this.state.winner===1) return;
    let addMoves = 1;
    if(i===this.state.previous)addMoves=0;
    this.setState({
      noOfMoves1: this.state.noOfMoves1 + addMoves,
      squares1: calculate(i, this.state.squares1),
      previous:this.state.squares1[0][0],
      winner: winnerCheck(this.state.squares1)
    });
  }
  newGame() {

    this.setState({
      squares1: initializeSquares(),
      noOfMoves1: 0,
      previous:20,
      winner : 0
    });
  }
  render() {
    return (
      <div className="game">
        <br></br>
        <div className="game-info">
          <div className="square">Moves {this.state.noOfMoves1} </div>

          <br></br>
          <button class="newgame" onClick={() => this.newGame()}>
            New Game{" "}
          </button>
        </div>
        <br></br>
        <div className="game-board">
          <Board
            handleClick2={i => this.handleClick(i)}
            squares={this.state.squares1}
          />
        </div>
        <div className="game-info">
          <ChooseColor handleClick1={i => this.handleClick(i)} />
        </div>
        <div> 
        <WinnerLogo value ={this.state.winner}/>
        </div>
      
        
      </div>
    );
  }
}


class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.handleClick2(this.props.squares[i][j])}
      />
    );
  }
  render() {
    const gridSize = 16;

    this.createTable = () => {
      let table = [];
      for (let i = 0; i < gridSize; i++) {
        let children = [];
        for (let j = 0; j < gridSize; j++) {
          children.push(this.renderSquare(i, j));
        }
        table.push(<div className="board-row">{children}</div>);
      }
      return table;
    };
    return <div>{this.createTable()}</div>;
  }
}
class ChooseColor extends React.Component {
  
  renderCircle(i)
  {
    return(
    <Circle 
    value = {i} 
    onClick ={()=>this.props.handleClick1(i) }
    />
    );
  }
  colorsRender = () => {
    let table1 = [];
    for (let i = 0; i < 5; i++) 
    {
      table1.push(this.renderCircle(i));
    }
    return table1;
  };
  render() {
    return(
    <div>{this.colorsRender()}</div>
    );
  }
}
const colors1 = [
  "squareRed",
  "squareGreen",
  "squareYellow",
  "squareBlue",
  "squareBlack"
];
function WinnerLogo(props)
{
  let win1='';
  if(props.value === 1) win1 ='WINNER';
  return(
  <div className = "App-logo">{win1}</div>
  );
}
function Circle(props) {
  let x = colors1[props.value] + 1;
  return (
    <div>
      <button key={x} className={x} onClick={props.onClick} />
      <br />
    </div>
  );
}
export default App;
