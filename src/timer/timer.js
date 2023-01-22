import React from 'react';
import './timer.css';

function Timer({ minutes = 0, seconds = 0 }) {
  const [paused, setPaused] = React.useState(false);
  const [[m, s], setTime] = React.useState([minutes, seconds]);

  const tick = () => {
    if (paused) return;
    if (m === 0 && s === 0) {
      setPaused(true);
    } else if (s === 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    // <div>
    //   <p>{`${m.toString().padStart(2, '0')}:${s
    //     .toString()
    //     .padStart(2, '0')}`}</p>
    //   <button onClick={() => setPaused(!paused)} type='button'>
    //     {paused ? 'Resume' : 'Pause'}
    //   </button>
    // </div>
    <span className='description'>
      <button
        onClick={() => setPaused(false)}
        type='button'
        aria-label='start timer'
        className='icon icon-play'
      />
      <button
        type='button'
        aria-label='pause timer'
        className='icon icon-pause'
        onClick={() => setPaused(true)}
      />
      {`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
    </span>
  );
}

export default Timer;
