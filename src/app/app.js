import AppHeader from '../app-header';
import Main from '../main';
import { Component } from 'react';

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
  maxId = 100;

  state = {
    todoData: [],
  };

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
      const newArr = [];
      todoData.forEach((el) => {
        const item = el;
        item.hidden = false;
        newArr.push(item);
      });
      return {
        todoData: newArr,
      };
    });
  };

  onCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = [];
      todoData.forEach((el) => {
        const item = el;
        item.hidden = item.done === false;
        newArr.push(item);
      });
      return {
        todoData: newArr,
      };
    });
  };

  onActive = () => {
    this.setState(({ todoData }) => {
      const newArr = [];
      todoData.forEach((el) => {
        const item = el;
        item.hidden = item.done === true;
        newArr.push(item);
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
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData];
      newArr.splice(idx, 1);
      return { todoData: newArr };
    });
  };

  createTodoItem(label, minutes, seconds) {
    this.maxId += 1;
    return {
      label,
      minutes,
      seconds,
      done: false,
      id: this.maxId,
      hidden: false,
      date: new Date(),
    };
  }

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done === true).length;
    const leftCount = todoData.length - doneCount;
    return (
      <div className='todoapp'>
        <AppHeader addItem={this.addItem} />
        <Main
          todosData={todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          leftCount={leftCount}
          onVisible={this.onVisible}
          onActive={this.onActive}
          onCompleted={this.onCompleted}
          clearCompletedItems={this.clearCompletedItems}
        />
      </div>
    );
  }
}
