import PropTypes from 'prop-types';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({ item, onToggleDone, onDeleted }) {
  Task.defaultProps = {
    label: 'Empty task',
  };

  Task.propTypes = {
    label: PropTypes.string,
  };

  const { label, done, hidden, date } = item;

  let text = label;
  if (typeof text !== 'string' || text === '') {
    text = Task.defaultProps.label;
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
          <span className='description' role='presentation'>
            {text}
          </span>
          <span className='created'>{dateResult}</span>
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
