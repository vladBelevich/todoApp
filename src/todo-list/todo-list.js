import Task from '../task';
import { AppContext } from '../app-context/app-context';
import { useContext } from 'react';

import './todo-list.css';

function TodoList() {
  const { todoData, deleteItem, onToggleDone } = useContext(AppContext);
  const elements = todoData.map((item) => {
    const id = item.id;
    return (
      <Task
        key={id}
        item={item}
        onDeleted={() => deleteItem(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return <ul className='todo-list'>{elements}</ul>;
}

export default TodoList;
