import { ITodo } from '../../../interface/types';
import { useAppDispatch } from '../../../store/hooks';
import { changeImportant, deleteTodo, makeTodo } from '../../../store/reducers/todoReducer';

const TodoItem = ({ id, todo, important, make }: ITodo) => {
  const dispatch = useAppDispatch();
  const classNames = `tasklist__item-text ${important ? 'tasklist__important' : ''} ${
    make ? 'tasklist__done' : ''
  }`;
  return (
    <li className="tasklist__item">
      <div className={classNames} onClick={() => dispatch(makeTodo(id))}>
        {todo}
      </div>
      <button className="tasklist__button" onClick={() => dispatch(changeImportant(id))}>
        mark important
      </button>
      <div className="tasklist__iconremove" onClick={() => dispatch(deleteTodo(id))}></div>
    </li>
  );
};

export default TodoItem;
