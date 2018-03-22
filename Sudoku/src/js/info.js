import React from 'react';
import logo from '../images/logo.png';

class Info extends React.Component {
  render() {
    return(
      <div className="about">
        <a className='code' target="_blank" title="SourceCode" href="https://github.com/GXwar/Game/tree/master/Sudoku"></a>
        <div className="showabout"></div>
        <div className="aboutme">
          <img className="aboutlogo" src={logo} alt="logo" />
          <hr/>
          <h3>About PlaySudoku</h3>
          <p>Sudoku is a game constructed by JavaScript(React), you could save it as bookmark, then you can solve the puzzle at any device with browser.</p>
          <h3>How many puzzles there are？</h3>
          <p>Sudoku can generate billions of puzzle, you don't need to worry about meeting same begin state.</p>
          <h3>How to play？</h3>
          <ol className="playhelp">
            <li>Click the blank square, then click the number below or keyboard to fill the blank.</li>
            <li>Click the numbers below to check the distribution of the selected number.</li>
            <li><span id="bt1">Click</span> to show the possible answer。<span id="bt2">Click</span> to get the answer of selected square(at most 3 times).</li>
            <li><span id="bt3">Click</span> to delete input, <span id="bt4">Click</span> to see the answer for the puzzle。</li>
          </ol>
          <h3>If you have any question about it</h3>
          <p>Please send me email: richardxulh@gmail.com</p>
          <hr/>
          <p>Sudoku Designed and Developed by <a href='https://github.com/GXwar'>@GXwar</a>.</p>
        </div>
      </div>
    )
  }
}
export default Info;
