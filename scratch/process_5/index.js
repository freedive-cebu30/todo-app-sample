// 「追加」ボタンをクリックした時に呼ばれる処理
// テキスト入力欄（id="add_text"）から入力された文字を取得
// 取得した文字をアラートに表示（デバッグ用）
const onClickAddTodo = () => {
  const inputText = document.getElementById('add_text').value;
  alert (inputText);
}


// HTML の「追加」ボタン（id="add_button"）を取得し、
// クリックされたら onClickAddTodo を実行するイベントを登録
const addbutton = document.getElementById('add_button').addEventListener('click', () => onClickAddTodo());