import { AppContext } from '../app-context/app-context';
import { useState, useContext } from 'react';
import './new-task-form.css';

function NewTaskForm() {
  const defaultData = {
    label: '',
    minutes: '',
    seconds: '',
  };

  const { addItem } = useContext(AppContext);
  const [data, setData] = useState(defaultData);

  const { label, minutes, seconds } = data;
  const onHandlerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label, minutes, seconds);
    setData(defaultData);
  };

  return (
    <form onSubmit={onSubmit} className='new-todo-form'>
      <input
        onChange={onHandlerChange}
        className='new-todo'
        placeholder='What needs to be done?'
        value={label}
        name='label'
        type='text'
      />
      <input
        onChange={onHandlerChange}
        className='new-todo-form__timer'
        placeholder='Min'
        name='minutes'
        value={minutes}
        type='number'
      />
      <input
        onChange={onHandlerChange}
        className='new-todo-form__timer'
        placeholder='Sec'
        name='seconds'
        value={seconds}
        type='number'
      />
      <button type='submit' aria-label='add' />
    </form>
  );
}

export default NewTaskForm;
