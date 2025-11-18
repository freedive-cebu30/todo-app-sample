import { useState } from 'react';
import './style.css';

export const Todo = () => {
  // useStateは、「UI 上で独立に変化してほしい最小単位」で設定します。
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(['TODO例']);
 
  const onClickAdd = () => {
    setTodos((prev) => [...prev, text]);
    setText('');
  };

  // 未完了リストの削除ボタンが押されたときに呼ばれる関数
  // 未完了リストのインデックスを受け取って、そのインデックスの要素を削除しています
  const onClickDelete = (targetIndex) => {
    const newTodos = [...todos];
    newTodos.splice(targetIndex, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <p>未完了リストの削除ボタンを押すと、リストが消える</p>
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
                <button className="btn-complete">完了</button>
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
          <li>
            <div>
              <p>完了TODO例</p>
              <button className="btn-incomplete">元に戻す</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
