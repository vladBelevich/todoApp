import Task from '../task';

import './todo-list.css';

function TodoList({ todosData, onDeleted, onToggleDone }) {
  const elements = todosData.map((item) => {
    const id = item.id;
    return (
      <Task
        key={id}
        item={item}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return <ul className='todo-list'>{elements}</ul>;
}

export default TodoList;
