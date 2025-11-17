import { useState } from 'react';
import './style.css';

export const Todo = () => {
  // useStateは、「UI 上で独立に変化してほしい最小単位」で設定します。
  const [text, setText] = useState('');
  // ここでは、未完了のTODOリストを管理するための状態を定義しています
  // todos: 未完了のTODOリストの配列
  // setTodos: 未完了のTODOリストを更新するための関数
  const [todos, setTodos] = useState(['TODO例']);
 
  // 追加ボタンが押されたときに呼ばれる関数
  // 入力されたテキストを未完了リストに追加し、入力欄をクリアしています
  const onClickAdd = () => {
    setTodos((prev) => [...prev, text]);
    setText('');
  };

  return (
    <>
      <p>テキストに値を入れて追加を押すと、未完了リストに表示される</p>
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
          {todos.map((todo) => (
            <li key={todo}>
              <div>
                <p>{todo}</p>
                <button className="btn-complete">完了</button>
                <button className="btn-delete">削除</button>
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
