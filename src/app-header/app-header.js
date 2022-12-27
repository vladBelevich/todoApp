import NewTaskForm from '../new-task-form';

function AppHeader({ addItem }) {
  return (
    <div className='header'>
      <h1>todos</h1>
      <NewTaskForm addItem={addItem} />
    </div>
  );
}

export default AppHeader;
