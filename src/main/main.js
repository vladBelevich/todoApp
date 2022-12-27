import TodoList from '../todo-list';
import Footer from '../footer';
import './main.css';

function Main({
  todosData,
  onDeleted,
  leftCount,
  onToggleDone,
  onVisible,
  onActive,
  onCompleted,
  clearCompletedItems,
}) {
  return (
    <section className='main'>
      <TodoList
        todosData={todosData}
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
      />
      <Footer
        leftCount={leftCount}
        onVisible={onVisible}
        onActive={onActive}
        onCompleted={onCompleted}
        clearCompletedItems={clearCompletedItems}
      />
    </section>
  );
}

export default Main;
