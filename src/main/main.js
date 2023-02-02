import TodoList from '../todo-list';
import Footer from '../footer';
import './main.css';

function Main() {
  return (
    <section className='main'>
      <TodoList />
      <Footer />
    </section>
  );
}

export default Main;
