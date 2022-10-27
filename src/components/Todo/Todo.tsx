import { ITodo } from '../../interface/types';

import './todo.css';
import Tabs from './Tabs/Tabs';
import TodoItem from './TodoItem/TodoItem';
import NewTodo from './NewTodoInput/NewTodoInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTodo } from '../../store/reducers/appReducer';

const Todo = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const filter = useAppSelector((state) => state.todo.activeTab);
  const dispatch = useAppDispatch();

  const filterTodo = () => {
    if (filter === 'Done') {
      return todos.filter((todo: ITodo) => todo.make === true);
    }
    if (filter === 'Active') {
      return todos.filter((todo: ITodo) => todo.make === false);
    }
    return todos;
  };

  const elementsTodos = filterTodo().map((todo: ITodo) => {
    return <TodoItem key={todo.id} {...todo} />;
  });

  return (
    <div className="todo-modal">
      <div className="todo-close" onClick={() => dispatch(toggleTodo())}></div>
      <div className="container-todo">
        <Tabs />
      </div>
      <div className="container-todo">{filter === 'Done' ? null : <NewTodo />}</div>
      <div className="container-todo">
        <ul className="tasklist">{elementsTodos}</ul>
      </div>
    </div>
  );
};

export default Todo;
