export const menu = 1;
export const name = 'Juego 3 en Raya';

import'./juego-3-en-raya.css'; // custom css

import { useState } from 'react';

export default function juego3enRaya() {
  const [values, setValues] = useState(Array(10).fill(''));
  const [status, setStatus] = useState('');
  const [log, setLog]       = useState([]);

  function updateGame( index ){
    const copyValues = values.slice();
    if (copyValues[index]) return;
    if (status !== '') return;
    copyValues[0] = (copyValues[0] === "X")? "O": "X";
    copyValues[index] = copyValues[0];
    setValues(copyValues);
    const copyLog = log.slice();
    copyLog.push('Jugador '+copyValues[0]+' a celda '+index);
    setLog(copyLog); console.log(copyLog);

    let win = checkRules(copyValues);
    if (win !== null) setStatus('JUGADOR '+win+' GANADOR');
  }

  function checkRules( vals ){
    const wins     = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ];
    let winX, winO = '';
    for (const win of wins) {
      winX = 0;
      winO = 0;

      for (const i of win) {
        if (vals[i] === 'X') { winX++; }
        if (vals[i] === 'O') { winO++; }
      }
      if (winX >= 3) {
        return 'X';
      }
      if (winO >= 3) {
        return 'O';
      }
    }
    return null;
  }

  return <div className='text-center'>
    <h1 className='text-black'>
      {name}
    </h1>
    <h3 className='text-primary'>
      { status }&nbsp;
    </h3>
    <div className="board">
      <div className="group">
        <Cell value={ values[1] } pulseCell={ () => updateGame(1) }/>
        <Cell value={ values[2] } pulseCell={ () => updateGame(2) }/>
        <Cell value={ values[3] } pulseCell={ () => updateGame(3) }/>
      </div>
      <div className="group">
        <Cell value={ values[4] } pulseCell={ () => updateGame(4) }/>
        <Cell value={ values[5] } pulseCell={ () => updateGame(5) }/>
        <Cell value={ values[6] } pulseCell={ () => updateGame(6) }/>
      </div>
      <div className="group">
        <Cell value={ values[7] } pulseCell={ () => updateGame(7) }/>
        <Cell value={ values[8] } pulseCell={ () => updateGame(8) }/>
        <Cell value={ values[9] } pulseCell={ () => updateGame(9) }/>
      </div>
    </div>
    <pre className='my-2 text-center'>
      <code>{ log.join('\n') }</code>
    </pre>
  </div>;
}

function Cell({ value, pulseCell }) {
  return <button className="cell" onClick={ pulseCell }>{ value }</button>;
}
