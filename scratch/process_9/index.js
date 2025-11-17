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

  // 「完了」ボタンを作成
  const completeButton = document.createElement('button');
  completeButton.innerText = "完了";
  completeButton.classList.add("btn-complete");
  completeButton.addEventListener('click', () => {
    // 押された完了ボタンの親要素を未完了リストから削除
    const completeTarget = completeButton.closest("li");
    document.querySelector('.incomplete-area ul').removeChild(completeTarget);

    // 完了リスト用のDOMを組み立てる
    const targetText = completeTarget.querySelector("p").innerText;
    const completeLi = document.createElement('li');
    const completeDiv = document.createElement('div');
    const completeP = document.createElement('p');
    completeP.innerText = targetText;

    const returnTocompleteButton = document.createElement('button');
    returnTocompleteButton.innerText = "元に戻す";
    returnTocompleteButton.classList.add("btn-incomplete");
    completeDiv.appendChild(completeP);
    completeDiv.appendChild(returnTocompleteButton);
    completeLi.appendChild(completeDiv);
    document.querySelector('.complete-area ul').appendChild(completeLi);
  });

  // 「削除」ボタンを作成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = "削除";
  deleteButton.classList.add("btn-delete");
  // 「削除」ボタンを押したときの処理
  deleteButton.addEventListener('click', () => {
    // 押された完了ボタンの親要素を未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    document.querySelector('.incomplete-area ul').removeChild(deleteTarget);  
  });

  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  // 未完了リスト（.incomplete-area 内の ul）に li を追加
  document.querySelector('.incomplete-area ul').appendChild(li);
}

// 追加ボタン（id="add_button"）をクリックしたら onClickAddTodo() を実行
document.getElementById('add_button').addEventListener('click', () => onClickAddTodo());