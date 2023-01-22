import Timer from '../timer';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({ item, onToggleDone, onDeleted }) {
  Task.defaultProps = {
    label: 'Empty task',
    minutes: 30,
    seconds: 0,
  };

  Task.propTypes = {
    label: PropTypes.string,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  };

  const { label, done, hidden, date, minutes, seconds } = item;
  let text = label;
  let minutesCount = Number(minutes);
  let secondsCount = Number(seconds);
  if (text === '') {
    text = Task.defaultProps.label;
  }
  if (secondsCount > 59 || secondsCount < 1) {
    secondsCount = Task.defaultProps.seconds;
  }
  if (minutesCount > 99) {
    minutesCount = 99;
  }
  if (minutesCount <= 0 && secondsCount <= 0) {
    minutesCount = Task.defaultProps.minutes;
  }

  let classNamesLi = '';
  if (done) {
    classNamesLi += ' completed';
  }
  if (hidden) {
    classNamesLi += ' hidden';
  }

  const dateResult = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <li className={classNamesLi}>
      <div className='view'>
        <input className='toggle' type='checkbox' onClick={onToggleDone} />
        <label>
          <span className='title'>{text}</span>
          <Timer minutes={minutesCount} seconds={secondsCount} />
          <span className='description' role='presentation'>
            {dateResult}
          </span>
        </label>
        <button aria-label='change' type='button' className='icon icon-edit' />
        <button
          type='button'
          className='icon icon-destroy'
          onClick={onDeleted}
          aria-label='delete'
        />
      </div>
    </li>
  );
}

export default Task;
