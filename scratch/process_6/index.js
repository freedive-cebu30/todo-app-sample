// 「追加」ボタンがクリックされたときの処理
const onClickAddTodo = () => {
  // 入力欄の文字を取得
  const inputText = document.getElementById('add_text').value;
  // 入力欄を空にする
  document.getElementById('add_text').value = ""

  // li → div → p, 完了ボタン, 削除ボタン を作成して組み立てる
  const li = document.createElement('li');
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = inputText;

  // div に p とボタンを追加
  div.appendChild(p);
  li.appendChild(div);

  // 未完了リスト（.incomplete-area 内の ul）に li を追加
  document.querySelector('.incomplete-area ul').appendChild(li);
}

// 追加ボタン（id="add_button"）をクリックしたら onClickAddTodo() を実行
const addbutton = document.getElementById('add_button').addEventListener('click', () => onClickAddTodo());