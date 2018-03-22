import React from 'react';

import sudokus from './sudokus.js';
import SudokuGenerator from './sudokuGenerator.js';
import Info from './info.js';
import logo from '../images/logo.png';

class Board extends React.Component {
  getsquares(rowindex) {
    let squares = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, squareindex) => {
      let cord = rowindex + '' + squareindex;
      let className = 'square';
      if (this.props.origin.has(cord)) { className += ' origin' }
      if (this.props.highlight.has(cord)) { className += ' highlight' }
      if (this.props.filter.has(cord)) { className += ' filter' }
      if (this.props.conflict.has(cord)) { className += ' conflict' }
      if (this.props.chosen === cord) { className += ' chosen' }
      return (
        <button key={squareindex} className={className} onClick={() => this.props.onClick(rowindex, squareindex)}>
          {this.props.values[rowindex][squareindex]}
        </button>
      )
    });

    return (
      <div key={rowindex} className={'row ' + rowindex}>
        {squares}
      </div>
    );
  }

  render() {
    let rows = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, rowindex) => {
      return this.getsquares(rowindex)
    });

    return (
      <div className='board'>
        {rows}
      </div>
    );
  };
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
    this.solve = this.solve.bind(this);
    this.help = this.help.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  generate(level) {
    let puzzles;
    switch (level) {
      case 'Very Easy':
        puzzles = sudokus.veryeasy;
        break;
      case 'Easy':
        puzzles = sudokus.easy;
        break;
      case 'Medium':
        puzzles = sudokus.medium;
        break;
      case 'Tough':
        puzzles = sudokus.tough;
        break;
      case 'Very Tough':
        puzzles = sudokus.verytough;
        break;
      case 'hell':
        puzzles = sudokus.hell;
        break;
    }
    let grid = puzzles[Math.floor(Math.random() * puzzles.length)];
    let sudoku = new SudokuGenerator(grid).generate();

    let puzzle = sudoku[0];
    this.solution = sudoku[1];
    const origin = new Set();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (puzzle[i][j]) {
          origin.add(i + '' + j);
        }
      }
    }

    this.setState({
      values: puzzle, // 9*9 array save the state of current Sudoku
      level: level, // game level
      peep: false,  // flag presents if the game is over
      origin: origin, // the squares with number on initialization
      chosen: null, // the selected square currently
      possible: null, // the possible answer for chosen square
      filter: new Set(),  // the squares with same value of selected square
      highlight: new Set(), // the squares on the same row, col or subGrid of the selected square
      check: false, // make the possible answer visible or not
      helps: 3, // the number of available help left
      conflict: new Set()
    })
  }

  // make the possible values for chosen square visible
  check() {
    this.setState({
      check: true
    })
  }

  // check the possible answer from current row, current column and current subGrid
  checkPossible(i, j) {
    let values = this.state.values;
    let allPossible = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    //horizontally
    for (let k=0; k<=8; k++) {
      if (k === j) { continue; }
      if (allPossible.has(values[i][k])) {
        allPossible.delete(values[i][k]);
      }
    }
    // vertically
    for (let k=0; k<=8; k++) {
      if (k === i) { continue; }
      if (allPossible.has(values[k][j])) {
        allPossible.delete(values[k][j]);
      }
    }
    // subGrid
    let bi = Math.floor(i / 3) * 3;
    let bj = Math.floor(j / 3) * 3;
    for (let m = bi; m < bi + 3; m++) {
      for (let n = bj; n < bj + 3; n++) {
        if (m === i && n === j) {
          continue;
        }
        if (allPossible.has(values[m][n])) {
          allPossible.delete(values[m][n]);
        }
      }
    }
    return allPossible;
  }

  // filter all squares with value and mark them
  filter(value) {
    let values = this.state.values;
    let filter = new Set();
    for (let m = 0; m < 9; m++) {
      for (let n = 0; n < 9; n++) {
        if (values[m][n] === value) {
          filter.add(m + '' + n)
        }
      }
    }
    this.setState({
      filter: filter,
      highlight: new Set(),
      chosen: null
    })
  }

  // handle the click on square of the board
  handleClick(i, j) {
    let values = this.state.values.slice();
    let thisValue = values[i].slice();
    // if the selected square has origin value, filter all of them
    if (this.state.origin.has(i + '' + j)) {
      this.filter(thisValue[j]);
      return ;
    } else {  // mark the squares at the same row, col or subGrid of the selected square
      this.highlight(i, j);
      let chosen = i + '' + j;
      let possible = Array.from(this.checkPossible(i, j)).toString();
      this.setState({
        chosen: chosen,
        possible: possible,
        filter: new Set(),
        check: false
      });
    }
  }

  // used to fill number to chosen square
  handleNumsClick(i) {
    // if the game is over, make the choices control useless
    if (this.state.peep) { return ; }
    let chosen = this.state.chosen;
    // if no square is chosen, just highlight all squares with same number of choices control
    if (!chosen) {
      this.filter('' + i);
    } else {
      let values = this.state.values.slice();
      if (this.state.origin.has([chosen[0]][chosen[1]])) {
        this.setState({
          chosen: null,
          highlight: new Set()
        });
        return ;
      }
      if (i === 'X') {  // click delete button to undo operation
        values[chosen[0]][chosen[1]] = null;
      } else {
        values[chosen[0]][chosen[1]] = '' + i;
      }

      let conflict = new Set();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (!values[i][j]) {
            continue;
          } else {
            let thisValue = values[i][j];
            let possible = this.checkPossible(i, j);
            if (!possible.has(thisValue)) {
              conflict.add(i + '' + j)
            }
          }
        }
      }

      this.setState(
        {
          values: values,
          highlight: new Set(),
          conflict: conflict,
          chosen: null
        }
      );
      // decide if the game is finished
      if (!this.state.peep && values.toString() === this.solution.toString()) {
        alert('Congratulation, you do it!!!');
        this.setState({
          peep: true
        })
      }
    }
  }

  // click the hint button to get help
  help() {
    let solution = this.solution;
    let values = this.state.values.slice();
    let chosen = this.state.chosen;
    let helps = this.state.helps;
    if (!chosen || this.state.origin.has(chosen[0] + '' + chosen[1]) || !this.state.helps) {
      return ;
    } else {
    let solutionValue = solution[chosen[0]][chosen[1]];
    values[chosen[0]][chosen[1]] = solutionValue;
    helps -= 1;
    let conflict = new Set();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!values[i][j]) {
          continue;
        } else {
          let thisValue = values[i][j];
          let possible = this.checkPossible(i, j);
          if (!possible.has(thisValue)) {
            conflict.add(i + '' + j);
          }
        }
      }
    }
    this.setState({
      values: values,
      highlight: new Set(),
      helps: helps,
      conflict: conflict
    })
    }
  }

  // highlight the squares at same row, col and subGrid
  highlight(i, j) {
    let values = this.state.values;
    let highlight = new Set();
    // add the square at the same row
    for (let k = 0; k < 9; k++) {
      if (values[i][k]) {
        highlight.add(i + '' + k)
      }
    }
    // add the square at the same column
    for (let k = 0; k < 9; k++) {
      if (values[k][j]) {
        highlight.add(k + '' + j);
      }
    }
    // add the square at the same subGrid
    let line = Math.floor(i / 3) * 3;
    let row = Math.floor(j / 3) * 3;
    for (let ln = line; ln < line + 3; ln++) {
      for (let r = row; r < row + 3; r++) {
        if (values[ln][r]) {
          highlight.add(ln + '' + r)
        }
      }
    }
    this.setState({
      highlight: highlight,
      filter: new Set()
    })
  }

  // give answer
  solve() {
    if (this.state.peep) {
      return ;
    }
    // after user operation, we will get true or false depending on what user select
    let r = confirm('Are you sure to see the answer? After check it you are not permitted to solve it again.');
    if (!r) {
      return ;
    } else {
      this.setState({
        values: this.solution,
        peep: true,
        conflict: new Set(),
        highlight: new Set(),
        filter: new Set(),
      })
    }
  }

  // run it before Component Mount
  componentWillMount() {
    this.generate('Easy');
    document.addEventListener('keydown', (ev) => {
      if (!this.state.chosen) { return ; }

      values[chosen[0]][chosen[1]] = ev.key;
      let conflict = new Set();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (!values[i][j]) {
            continue;
          } else {
            let thisValue = values[i][j];
            let possible = this.checkPossible(i, j);
            if (!possible.has(thisValue)) {
              conflict.add(i + '' + j)
            }
          }
        }
      }

      this.setState(
        {
          values: values,
          highlight: new Set(),
          conflict: conflict,
          chosen: null
        }
      );

      // decide if the game is finished
      if (!this.state.peep && values.toString() === this.solution.toString()) {
        alert('Congratulation, you do it!!!');
        this.setState({
          peep: true
        })
      }
    })
  }

  render() {
    let peep = this.state.peep ? 'peep' : '';
    let checking = this.state.check ? ' checking' : '';
    let hinttime = [' zero', ' one', ' two', ' three'][this.state.helps];
    let controls = ['Very Easy', 'Easy', 'Medium', 'Tough', 'Very Tough'].map((level, index) => {
      let active = level === this.state.level ? ' active' : '';
      return <li key={index} className={"level" + active} onClick={() => this.generate(level)}>{level}</li>;
    });
    let choices = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((i) => {
      return <button key={i} className="choice" value={i} onClick={() => this.handleNumsClick(i)}>{i}</button>
    });
    return (
      <div className="game">
        <img className="logo" alt="PlaySudoku" src={logo} />
        <ul className="controls">
          {controls}
        </ul>
        <div className="main">
          <div className="left">
            <button className="delete" onClick={() => this.handleNumsClick("X")} />
            <div className={"checktext" + checking}>
              <p value={this.state.possible}>{this.state.possible}</p>
            </div>
            <button className="check" onClick={this.check} />
          </div>
          <Board values={this.state.values}
                 origin={this.state.origin}
                 conflict={this.state.conflict}
                 chosen={this.state.chosen}
                 highlight={this.state.highlight}
                 filter={this.state.filter}
                 onClick={this.handleClick} />
          <div className="right">
            <button className={"solve" + peep} onClick={this.solve} />
            <button className={"hint" + hinttime} onClick={this.help} />
          </div>
        </div>
        <ul className="choices">
          {choices}
        </ul>
        <Info />
      </div>
    );
  }
}

export default Game;