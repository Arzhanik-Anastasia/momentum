import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../store/hooks';
import { addTodo } from '../../../store/reducers/todoReducer';

const NewTodo = () => {
  const [textTodo, setText] = useState('');
  const dispatch = useAppDispatch();

  const handlerTodo = () => {
    const newTodo = {
      id: uuidv4(),
      important: false,
      make: false,
      todo: textTodo,
    };
    dispatch(addTodo(newTodo));
    setText('');
  };

  return (
    <div className="new__task">
      <p>New Task</p>
      <input
        type="text"
        className="new__task-text"
        value={textTodo}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="new__task-btn" onClick={() => handlerTodo()}>
        ADD
      </button>
    </div>
  );
};

export default NewTodo;
