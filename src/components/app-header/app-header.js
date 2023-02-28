import NewTaskForm from '../new-task-form';

function AppHeader() {
  return (
    <div className='header'>
      <h1>todos</h1>
      <NewTaskForm />
    </div>
  );
}

export default AppHeader;
