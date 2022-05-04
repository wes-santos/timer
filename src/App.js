import React, { useState, useEffect } from 'react';

let intervalId;

const App = () => {
  const [secondsAmount, setSecondsAmount] = useState('0');

  const minutes = Math.floor(Number(secondsAmount) / 60);
  const seconds = Number(secondsAmount) % 60;

  const handleChange = ({ target: { value } }) => {
    setSecondsAmount(Number(value) * 60);
  }

  const handleClick = () => {
    if (Number(secondsAmount) > 0) {
      intervalId = setInterval(() => {
        setSecondsAmount(prevState => prevState - 1);
      }, 1000);
    }
  }

  useEffect(() => {
    if (secondsAmount === 0) {
      global.alert('Time is over!');
      clearInterval(intervalId);
    }
  }, [secondsAmount]);

  return(
    <main>
      <h1 className="time">
        { `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}` }
      </h1>
      <div className="time-components">
        <input
          type="number"
          min="1"
          onChange={ handleChange }
        />
        <button
          type="button"
          onClick={ handleClick }
        >
          Start
        </button>
        <button
          type="button"
          onClick={ () => clearInterval(intervalId) }
        >
          Stop
        </button>
      </div>
    </main>
  )
}

export default App;
