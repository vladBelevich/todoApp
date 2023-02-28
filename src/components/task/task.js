import Timer from '../timer';
import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';

function Task({
  item,
  onToggleDone,
  onDeleted,
  dateToObject,
  onEditing,
  applyChangedText,
}) {
  Task.defaultProps = {
    minutes: 30,
    seconds: 0,
  };

  Task.propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number,
  };
  const { label, done, hidden, date, minutes, seconds, id } = item;
  const { editing } = item;

  let minutesCount = Number(minutes);
  let secondsCount = Number(seconds);

  if (secondsCount > 59 || secondsCount < 1) {
    secondsCount = Task.defaultProps.seconds;
  }
  if (minutesCount > 99) {
    minutesCount = 99;
  }
  if (minutesCount <= 0 && secondsCount <= 0) {
    minutesCount = Task.defaultProps.minutes;
  }

  const classNamesLi = classNames({
    completed: done,
    hidden,
    editing,
  });
  const dateResult = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  });

  const changeText = (event) => {
    event.preventDefault();
    let localData = JSON.parse(window.localStorage.getItem('todoData'));
    const idx = localData.findIndex((el) => el.id === id);
    if (event.target[0].value === '') {
      localData[idx] = {
        ...localData[idx],
        editing: false,
      };
    } else {
      localData[idx] = {
        ...localData[idx],
        label: event.target[0].value,
        editing: false,
      };
    }
    localData = dateToObject(localData);
    window.localStorage.setItem('todoData', JSON.stringify(localData));
    applyChangedText(localData);
  };

  return (
    <li className={classNamesLi}>
      <div className='view'>
        <input className='toggle' type='checkbox' onClick={onToggleDone} />
        <label>
          <span className='title'>{label}</span>
          <Timer minutes={minutesCount} seconds={secondsCount} />
          <span className='description' role='presentation'>
            {dateResult}
          </span>
        </label>
        <button
          aria-label='change'
          type='button'
          className='icon icon-edit'
          onClick={onEditing}
        />
        <button
          type='button'
          className='icon icon-destroy'
          onClick={onDeleted}
          aria-label='delete'
        />
      </div>
      <form onSubmit={(event) => changeText(event)}>
        <input type='text' placeholder={label} className='edit' />
      </form>
    </li>
  );
}

export default Task;
