import { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    const state = this.state;
    const props = this.props;
    props.addItem(state.label);
    event.preventDefault();
    this.setState({
      label: '',
    });
  };

  render() {
    const state = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          className='new-todo'
          placeholder='What needs to be done?'
          value={state.label}
        />
      </form>
    );
  }
}
