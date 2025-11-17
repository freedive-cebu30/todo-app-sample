import { useState } from 'react';
import './style.css';

export const Todo = () => {
  // useStateは、「UI 上で独立に変化してほしい最小単位」で設定します。
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(['TODO例']);

  // ここでは、完了したTODOリストを管理するための状態を定義しています
  // completeTodos: 完了したTODOリストの配列
  // setCompleteTodos: 完了したTODOリストを更新するための関数
  const [completeTodos, setCompleteTodos] = useState([]);
 
  const onClickAdd = () => {
    setTodos((prev) => [...prev, text]);
    setText('');
  };

  const onClickDelete = (targetIndex) => {
    const newTodos = [...todos];
    newTodos.splice(targetIndex, 1);
    setTodos(newTodos);
  };

  // 完了ボタンが押されたときに呼ばれる関数
  // 未完了リストの末尾の要素を完了リストに移動しています
  const onClickComplete = (targetIndex) => {
    const newTodos = [...todos];
    const [removedValue] = newTodos.splice(targetIndex, 1);
    setTodos(newTodos);
    setCompleteTodos((prev) => [...prev, removedValue]);
  };

  return (
    <>
      <p>完了を押すと、下の完了に移動して戻すボタンになっている</p>
      <div className="input-area">
        <input
          type="text"
          id="add_text"
          placeholder="TODOを入れて下さい"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button id="add_button" onClick={onClickAdd}>
          追加
        </button>
      </div>
      <div className="incomplete-area area-box">
        <p>未完了</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={`${todo}-${index}`}>
              <div>
                <p>{todo}</p>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="complete-area area-box">
        <p>完了</p>
        <ul>
          {completeTodos.map((todo, index) => (
            <li key={`${todo}-${index}`}>
              <div>
                <p>{todo}</p>
                <button className="btn-incomplete">
                  元に戻す
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
