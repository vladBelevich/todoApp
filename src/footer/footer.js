import './footer.css';
import { AppContext } from '../app-context/app-context';
import { useContext } from 'react';

function Footer() {
  const { leftCount, onVisible, onActive, onCompleted, clearCompletedItems } =
    useContext(AppContext);

  return (
    <footer className='footer'>
      <span className='todo-count'>{leftCount} items left</span>
      <ul className='filters'>
        <li>
          <button type='button' onClick={onVisible}>
            All
          </button>
        </li>
        <li>
          <button type='button' onClick={onActive}>
            Active
          </button>
        </li>
        <li>
          <button type='button' onClick={onCompleted}>
            Completed
          </button>
        </li>
      </ul>
      <button
        type='button'
        className='clear-completed'
        onClick={clearCompletedItems}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
