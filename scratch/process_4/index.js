
// TODO追加ボタンがクリックされた時の処理
const onClickAddTodo = () => {
  alert ('追加ボタンが押されました');
}

// HTML 上の「追加」ボタン（id="add_button"）を取得し、
// クリックイベントが発生したら onClickAddTodo を実行する
const addbutton = document.getElementById('add_button').addEventListener('click', () => onClickAddTodo());