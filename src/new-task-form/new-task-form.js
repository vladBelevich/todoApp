import { useState } from 'react';
import './new-task-form.css';

function NewTaskForm({ addItem }) {
  const defaultData = {
    label: '',
    minutes: '',
    seconds: '',
  };

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

// export default class NewTaskForm extends Component {
//   state = {
//     label: '',
//     minutes: '',
//     seconds: '',
//   };
//
//   onHandlerChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     this.setState({
//       [name]: value,
//     });
//   };
//
//   onSubmit = (event) => {
//     event.preventDefault();
//     const state = this.state;
//     const props = this.props;
//     props.addItem(state.label, state.minutes, state.seconds);
//     this.setState({
//       label: '',
//       minutes: '',
//       seconds: '',
//     });
//   };
//
//   render() {
//     const state = this.state;
//     return (
//         <form onSubmit={this.onSubmit} className='new-todo-form'>
//           <input
//               onChange={this.onHandlerChange}
//               className='new-todo'
//               placeholder='What needs to be done?'
//               value={state.label}
//               name='label'
//               type='text'
//           />
//           <input
//               onChange={this.onHandlerChange}
//               className='new-todo-form__timer'
//               placeholder='Min'
//               name='minutes'
//               value={state.minutes}
//               type='number'
//           />
//           <input
//               onChange={this.onHandlerChange}
//               className='new-todo-form__timer'
//               placeholder='Sec'
//               name='seconds'
//               value={state.seconds}
//               type='number'
//           />
//           <button type='submit' aria-label='add' />
//         </form>
//     );
//   }
// }

export default NewTaskForm;
