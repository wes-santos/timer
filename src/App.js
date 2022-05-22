import React, { useState, useEffect } from 'react';
import tempo from './tempo.mp3';

let intervalId;
let timeoutId;

const App = () => {
  const [originalSeconds, setOriginalSeconds] = useState(0);
  const [originalMinutes, setOriginalMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [audio] = useState(new Audio(tempo));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    if (seconds === 0 && minutes > 0) {
      setMinutes(prev => prev - 1);
      setSeconds(59);
    }
  }, [seconds]);

  const handleStart = () => {
    setPlaying(false);
    intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setPlaying(true);
    }, minutes * 60 * 1000 + seconds * 1000);
  };

  const handleMinutes = ({target: { value }}) => {
    setOriginalMinutes(Number(value));
    setMinutes(Number(value));
  };

  const handleSeconds = ({ target: { value } }) => {
    if (seconds > 58) {
      setMinutes(prev => prev + 1);
      return setSeconds(0);
    }
    setOriginalSeconds(Number(value));
    setSeconds(Number(value));
  };

  const handleStop = () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  const handleRestart = () => {
    setMinutes(originalMinutes);
    setSeconds(originalSeconds);
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    handleStart();
  };

  return (
    <main>
      <div className="center">
        <div className="time">
          {`${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`}
        </div>
      </div>
      <div className="center">
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={ handleMinutes }
          />
          <input
            type="number"
            min="0"
            value={seconds}
            onChange={ handleSeconds }
          />
        </div>
        <div className="center-row">
          <button
            type="button"
            onClick={ handleStart }
            className="button"
          >
            Start
          </button>
          <button
            type="button"
            onClick={ handleStop }
            className="button"
          >
            Stop
          </button>

          <button
            type="button"
            onClick={ handleRestart }
            className="button"
          >
            Restart
          </button>
        </div>
    </main>
  )
}

export default App;
