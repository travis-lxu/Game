import React from 'react';

import sudokus from './sudokus.js';
import SudokuGenerator from './sudokuGenerator.js';
import logo from '../images/logo.png';

class Board extends React.Component {
  getsquares(rowindex) {
    let squares = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i, squareindex) => {
      let cord = rowindex + '' + squareindex
        , className = 'square';
      if (this.props.origin.has(cord)) { className += ' origin' }
      // if (this.props.highlight.has(cord)) { className += ' highlight' }
      // if (this.props.filter.has(cord)) { className += ' filter' }
      // if (this.props.conflict.has(cord)) { className += ' conflict' }
      // if (this.props.chosen === cord) { className += ' chosen' }
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
      possible: null,
      filter: new Set(),
      highlight: new Set(),
      check: false,
      helps: 3,
      conflict: new Set()
    })
  }

  check() {

  }

  filter(value) {
    // let values = this.state.values;
    // let filter = new Set();
    // for (let m=0; m<9; m++) {
    //   for (let n=0; n<9; n++) {
    //     if (values[m][n] === value) {}
    //   }
    // }
  }

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
        // conflict: new Set(),
        // highlight: new Set(),
        // filter: new Set(),
      })
    }
  }

  help() {

  }

  handleClick(i, j) {
    let values = this.state.values.slice();
    let thisvalue = values[i].slice();
    if (this.state.origin.has(i + '' + j)) {
      this.filter(thisvalue[j]);
      return ;
    } else {
      // this.highlight(i, j);
      let chosen = i + '' + j;
      // let possible = Array.from(this.checkPossible(i, j)).toString();
      this.setState({
        chosen: chosen,
        // possible: possible,
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
      // this.filter('' + i)
    } else {
      let values = this.state.values.slice();
      if (this.state.origin.has([chosen[0]][chosen[1]])) {
        this.setState({
          chosen: null,
          highlight: new Set()
        });
        return ;
      }
      if (i === 'X') {
        values[chosen[0]][chosen[1]] = null;
      } else {
        values[chosen[0]][chosen[1]] = '' + i;
      }
      // var conflict = new Set()
      // for (let i = 0; i < 9; i++) {
      //   for (let j = 0; j < 9; j++) {
      //     if (!values[i][j]) {
      //       continue
      //     } else {
      //       var thisvalue = values[i][j],
      //         possible = this.checkPossible(i, j)
      //       if (!possible.has(thisvalue)) {
      //         conflict.add(i + '' + j)
      //       }
      //     }
      //   }
      // }
      this.setState(
        {
          values: values,
          highlight: new Set(),
          // conflict: conflict,
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

  componentWillMount() {
    this.generate('Easy');
  }

  render() {
    let peep = this.state.peep ? 'peep' : '';
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
          <div className="left"></div>
          <Board values={this.state.values}
                 origin={this.state.origin}
                 chosen={this.state.chosen}
                 onClick={this.handleClick} />
          <div className="right">
            <button className={"solve" + peep} onClick={this.solve} />

          </div>
        </div>
        <ul className="choices">
          {choices}
        </ul>
      </div>
    );
  }
}

export default Game;