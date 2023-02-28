import AppHeader from '../app-header';
import Main from '../main';
import dateToObject from '../../services/services';
import { AppProvider } from '../app-context/app-context';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './app.css';

const toggleProperty = (arr, id, propName) => {
  const idx = arr.findIndex((el) => el.id === id);
  const oldItem = arr[idx];
  const newItem = { ...oldItem, [propName]: !oldItem[propName] };
  const newArr = [...arr];
  newArr[idx] = newItem;
  return newArr;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todoData: [] };
  }

  componentDidMount() {
    const { todoData } = this.state;
    if (!window.localStorage.todoData) {
      localStorage.setItem('todoData', JSON.stringify(todoData));
    }
    let localData = JSON.parse(window.localStorage.getItem('todoData'));
    localData = dateToObject(localData);

    this.setState({ todoData: localData });
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds);
    const localData = JSON.parse(localStorage.getItem('todoData'));
    // eslint-disable-next-line no-console
    localData.push(newItem);
    localStorage.setItem('todoData', JSON.stringify(localData));
    this.setState(() => {
      let newArr = JSON.parse(localStorage.getItem('todoData'));
      newArr = dateToObject(newArr);
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: toggleProperty(todoData, id, 'done'),
    }));
  };

  onVisible = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.hidden = false;
        return el;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.hidden = el.done === false;
        return el;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onActive = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.hidden = el.done === true;
        return el;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onEditing = (id) => {
    let localData = JSON.parse(window.localStorage.getItem('todoData'));
    const idx = localData.findIndex((el) => el.id === id);
    localData[idx] = { ...localData[idx], editing: true, done: false };
    window.localStorage.setItem('todoData', JSON.stringify(localData));
    localData = dateToObject(localData);
    this.setState({ todoData: localData });
  };

  applyChangedText = (arr) => {
    this.setState({ todoData: arr });
  };

  clearCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.done === false);
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    let localData = JSON.parse(window.localStorage.getItem('todoData'));
    localData = localData.filter((el) => el.id !== id);
    window.localStorage.setItem('todoData', JSON.stringify(localData));
    localData = dateToObject(localData);
    this.setState({ todoData: localData });
  };

  // eslint-disable-next-line class-methods-use-this
  createTodoItem(label, minutes, seconds) {
    return {
      label,
      minutes,
      seconds,
      done: false,
      id: uuidv4(),
      hidden: false,
      date: new Date(),
      editing: false,
    };
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done === true).length;
    const leftCount = todoData.length - doneCount;
    return (
      <div className='todoapp'>
        <AppProvider
          value={{
            todoData,
            leftCount,
            deleteItem: this.deleteItem,
            onToggleDone: this.onToggleDone,
            addItem: this.addItem,
            onVisible: this.onVisible,
            onActive: this.onActive,
            onCompleted: this.onCompleted,
            clearCompletedItems: this.clearCompletedItems,
            dateToObject,
            onEditing: this.onEditing,
            applyChangedText: this.applyChangedText,
          }}
        >
          <AppHeader />
          <Main />
        </AppProvider>
      </div>
    );
  }
}
