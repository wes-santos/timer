import React, { useState, useEffect } from 'react';
import tempo from './tempo.mp3';
import YoutubeBackground from 'react-youtube-background';
import ReactPlayer from 'react-player';
import track from './utils/musics.js';

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
  const [trackIndex, setTrackIndex] = useState(0);
  const [source, setSource] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoTime, setVideoTime] = useState(0);

  useEffect(() => {
    isTimeEnded ? audio.play() : audio.pause();
  }, [isTimeEnded]);

  useEffect(() => {
    if (isPlaying && source === '') {
      track[trackIndex].play();
      track[trackIndex].onended = () => { 
        changeSong();
      };
    } else {
      track[trackIndex].pause();
    }
  }, [isPlaying, trackIndex]);

  useEffect(() => {
    if (isPlaying) {
      if (seconds === 0 && minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      }
    }
  }, [seconds, minutes]);

  const generateRandomIndex = () => (
    Math.floor(Math.random() * 34)
  );

  const changeSong = () => {
    setTrackIndex(generateRandomIndex());
  }

  const handleStart = () => {
    setIsPlaying(true);
    setIsTimeEnded(false);
    changeSong();
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
      videoId={ isPlaying && videoId ? videoId : 'gnZImHvA0ME' }
      className="background"
      start-at={ videoTime }
    >
      <main>
          <div className="center">
            <div className="time">
              {`${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`}
            </div>
          </div>
          <div>
            <label htmlFor="sourceInput">
              <input
                type="text"
                id="souceInput"
                placeholder="put your playlist here"
                value={ source }
                onChange={ handleSource }
              />
            </label>
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
            <div className="hidden">
              <ReactPlayer
                url={ source }
                playing={ isPlaying }
                onProgress={ (progress) => {
                  const time = progress.playedSeconds;
                  setVideoTime(time);
                } }
              />
            </div>
      </main>
    </YoutubeBackground>
  )
}

export default App;
