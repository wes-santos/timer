import React, { useEffect, useState } from 'react';

let secondsIntervalId;
let minutesIntervalId;

const App = () => {
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [time, setTime] = useState('0');

  const startTimer = () => {
    secondsIntervalId = setInterval(() => { setSeconds((prevState) => parseInt(prevState, 10) + 1) }, 1000);
    console.log(Number(time));
    const time2 = parseInt(time, 10) * 1000;
    console.log(time2);
    setTimeout(() => { clearInterval(secondsIntervalId) }, time2); // Late it have to be the time typed in Input
  }

  const handleChange = ({ target }) => {
    setTime(target.value);
  }

  return (
    <main>
      <h1 className="counter">{ `${minutes}:${seconds}` }</h1>
      <div className="buttons-container">
        <input
          type="number"
          min="0"
          placeholder="Minutos"
          value={ time }
          className="time-input"
          onChange={ handleChange }
        />
        <button type="button" className="start-button" onClick={ startTimer }>
          Go!
        </button>
        <button type="button" className="stop-button">
          Stop!
        </button>
      </div>
    </main>
  );
}

export default App;
