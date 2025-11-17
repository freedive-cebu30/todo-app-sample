import './style.css';

export const Todo = () => (
  <>
    <p>JSXの記法でCSSを設定</p>
    <div className="input-area">
      <input type="text" placeholder="TODOを入れて下さい" />
      <button>追加</button>
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
