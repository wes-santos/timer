import React, { useState, useEffect } from 'react';
import tempo from './tempo.mp3';
import YoutubeBackground from 'react-youtube-background';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRepeat } from '@fortawesome/free-solid-svg-icons'

let intervalId;
let timeoutId;

const App = () => {
  const [originalSeconds, setOriginalSeconds] = useState(0);
  const [originalMinutes, setOriginalMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [audio] = useState(new Audio(tempo));
  const [isTimeEnded, setIsTimeEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [source, setSource] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    isTimeEnded ? audio.play() : audio.pause();
  }, [isTimeEnded]);

  useEffect(() => {
    if (isPlaying) {
      if (seconds === -1 && minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      }
    }
  }, [seconds, minutes]);

  const handleStart = () => {
    if (!source.includes('youtube') && source !== '') {
      return global.alert('A playlist precisa ser do YouTube!')
    }
    if(minutes === 0 && seconds === 0) {
      return global.alert('Você precisa definir um tempo!');
    }
    setIsPlaying(true);
    setIsTimeEnded(false);
    if (seconds === 0 && minutes > 0) {
      setSeconds(59);
      setMinutes(prev => prev - 1);
    }

    intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsPlaying(false);
      setIsTimeEnded(true);
    }, minutes * 60 * 1000 + seconds * 1000);
  };

  const handleMinutes = ({ target: { value } }) => {
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
    setIsPlaying(false);
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };

  const handleRestart = () => {
    setMinutes(originalMinutes);
    setSeconds(originalSeconds);
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    setIsPlaying(false);
    handleStart();
  };

  const handleSource = ({ target: { value } }) => {
    setSource(value);
  };

  const getVideoId = () => {
    const sourceArr = source.split('');
    const result = source.substring(sourceArr.indexOf('?') + 3);
    return setVideoId(result);
  };

  useEffect(() => { getVideoId() }, [source]);

  return (
    <YoutubeBackground
      videoId={isPlaying && videoId ? videoId : 'anypqg9428Y'}
      className="background"
    >
      <main>
        <div className="wrapper">
          <div>
              <div className="time">
                <input 
                  type="number"
                  min="0"
                  value={ minutes.toString().padStart(2, 0) }
                  onChange={ handleMinutes }
                  className="time-minutes"
                />
                <span className="time-separator">:</span>
                <input
                  type="number"
                  min="0"
                  value={ seconds.toString().padStart(2, 0) }
                  onChange={ handleSeconds }
                  className="time-seconds"
                />
              </div>
            <div className="center">
              <p className="label-text">Que tal escolher sua própria playlist?</p>
              <input
                type="text"
                placeholder="Coloque o link do YouTube aqui"
                className="source-input"
                value={source}
                onChange={handleSource}
              />
            </div>
            <div className="center-row">
              <button
                type="button"
                onClick={handleStart}
                className="button"
              >
                <FontAwesomeIcon icon={faPlay} />
                Start
              </button>
              <button
                type="button"
                onClick={handleStop}
                className="button"
              >
                <FontAwesomeIcon icon={faPause} />
                Stop
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="button"
              >
                <FontAwesomeIcon icon={faRepeat} />
                Restart
              </button>
            </div>
            <div className="hidden">
              <ReactPlayer
                url={
                  source.length ? source : 'https://www.youtube.com/watch?v=anypqg9428Y'
                }
                playing={isPlaying}
              />
            </div>
          </div>
        </div>
      </main>
    </YoutubeBackground>
  )
}

export default App;
