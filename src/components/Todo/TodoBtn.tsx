import { useAppDispatch } from '../../store/hooks';
import { toggleTodo } from '../../store/reducers/appReducer';

const TodoBtn = () => {
  const dispatch = useAppDispatch();
  return <div className="todo-btn" onClick={() => dispatch(toggleTodo())}></div>;
};

export default TodoBtn;
