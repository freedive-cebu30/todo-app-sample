import { useState } from 'react';
import './style.css';

const InputArea = ({ text, onChange, onAdd }) => (
  <div className="input-area">
    <input
      type="text"
      id="add_text"
      placeholder="TODOを入れて下さい"
      value={text}
      onChange={onChange}
    />
    <button id="add_button" onClick={onAdd}>
      追加
    </button>
  </div>
);

const TodoList = ({
  className,
  title,
  todos,
  getDragStartHandler,
  onDragOver,
  onDrop,
  renderActions
}) => (
  <div className={`${className} area-box`} onDragOver={onDragOver} onDrop={onDrop}>
    <p>{title}</p>
    <ul>
      {todos.map((todo, index) => (
        <li
          key={`${todo}-${index}`}
          draggable
          onDragStart={getDragStartHandler(index)}
        >
          <div>
            <p>{todo}</p>
            {renderActions(index)}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export const Todo = () => {
  // useStateは、「UI 上で独立に変化してほしい最小単位」で設定します。
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onClickAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, trimmed]);
    setText('');
  };

  const onClickDelete = (targetIndex) => {
    const newTodos = [...todos];
    newTodos.splice(targetIndex, 1);
    setTodos(newTodos);
  };

  const onClickComplete = (targetIndex) => {
    const newTodos = [...todos];
    const [removedValue] = newTodos.splice(targetIndex, 1);
    setTodos(newTodos);
    setCompleteTodos((prev) => [...prev, removedValue]);
  };

  // 元に戻すボタンが押されたときに呼ばれる関数
  // 完了リストの末尾の要素を未完了リストに移動しています
  const onClickReturn = (targetIndex) => {
    const newCompleteTodos = [...completeTodos];
    const [returnedValue] = newCompleteTodos.splice(targetIndex, 1);
    setCompleteTodos(newCompleteTodos);
    setTodos((prev) => [...prev, returnedValue]);
  };

  const handleDragStart = (type, index) => (event) => {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ type, index })
    );
  };

  const handleDropToComplete = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (!data) return;
    const payload = JSON.parse(data);
    if (payload.type !== 'incomplete') return;
    onClickComplete(payload.index);
  };

  const handleDropToIncomplete = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if (!data) return;
    const payload = JSON.parse(data);
    if (payload.type !== 'complete') return;
    onClickReturn(payload.index);
  };

  const allowDrop = (event) => event.preventDefault();

  return (
    <>
      <p>「元に戻す」を押すと、未完了に移動する</p>
      <InputArea
        text={text}
        onChange={(event) => setText(event.target.value)}
        onAdd={onClickAdd}
      />
      <TodoList
        className="incomplete-area"
        title="未完了"
        todos={todos}
        getDragStartHandler={(index) => handleDragStart('incomplete', index)}
        onDragOver={allowDrop}
        onDrop={handleDropToIncomplete}
        renderActions={(index) => (
          <>
            <button
              className="btn-complete"
              onClick={() => onClickComplete(index)}
            >
              完了
            </button>
            <button
              className="btn-delete"
              onClick={() => onClickDelete(index)}
            >
              削除
            </button>
          </>
        )}
      />
      <TodoList
        className="complete-area"
        title="完了"
        todos={completeTodos}
        getDragStartHandler={(index) => handleDragStart('complete', index)}
        onDragOver={allowDrop}
        onDrop={handleDropToComplete}
        renderActions={(index) => (
          <button
            className="btn-incomplete"
            onClick={() => onClickReturn(index)}
          >
            元に戻す
          </button>
        )}
      />
    </>
  );
};
