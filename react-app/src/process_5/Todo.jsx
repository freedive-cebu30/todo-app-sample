import { useState } from 'react';
import './style.css';

export const Todo = () => {
  // useStateは、「UI 上で独立に変化してほしい最小単位」で設定します。
  // ここでは、入力されたテキストを保持するための state を定義しています。
  // text: 現在の入力値
  // setText: 入力値を更新するための関数
  const [text, setText] = useState('');

  const onClickAdd = () => {
    alert(text);
  };

  return (
    <>
      <p>テキストに値を入れて追加を押すと、アラートに表示される</p>
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
          <li>
            <div>
              <p>TODO例</p>
              <button className="btn-complete">完了</button>
              <button className="btn-delete">削除</button>
            </div>
          </li>
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
