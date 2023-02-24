import AppHeader from '../app-header';
import Main from '../main';
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
  defaultState = {
    todoData: [],
  };

  todoData = window.localStorage.todoData;

  componentDidMount() {
    // eslint-disable-next-line
    console.log(this.todoData);
    if (!this.todoData) {
      localStorage.setItem('todoData', this.defaultState.todoData);
    }
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds);
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      newArr.push(newItem);
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

  clearCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.done === false);
      return {
        todoData: newArr,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);
      return { todoData: newArr };
    });
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
    };
  }

  render() {
    let todoData;
    if (this.todoData === undefined) {
      todoData = this.defaultState.todoData;
    } else {
      todoData = this.todoData;
    }
    const doneCount = todoData.filter((el) => el.done === true).length;
    const leftCount = this.todoData.length - doneCount;
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
          }}
        >
          <AppHeader />
          <Main />
        </AppProvider>
      </div>
    );
  }
}
