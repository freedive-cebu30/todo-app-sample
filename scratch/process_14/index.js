const incompleteArea = document.querySelector('.incomplete-area');
const completeArea = document.querySelector('.complete-area');
const incompleteList = incompleteArea.querySelector('ul');
const completeList = completeArea.querySelector('ul');
let draggedContext = null;

// 「追加」ボタンがクリックされたときの処理
const onClickAddTodo = () => {
  // 入力欄の文字を取得
  const inputText = document.getElementById('add_text').value;
  // 入力欄を空にする
  document.getElementById('add_text').value = '';
  if (!inputText.trim()) return;
  createTodoItem(inputText);
};

const registerDragEvents = (li, type) => {
  li.setAttribute('draggable', 'true');
  li.addEventListener('dragstart', (event) => {
    draggedContext = { element: li, type };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', type);
  });
  li.addEventListener('dragend', () => {
    draggedContext = null;
  });
};

// TODOアイテムを作成する関数
const createTodoItem = (inputText) => {
  // li → div → p, 完了ボタン, 削除ボタン を作成して組み立てる
  const li = document.createElement('li');
  registerDragEvents(li, 'incomplete');
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
    incompleteList.removeChild(completeTarget);

    // 完了リスト用のDOMを組み立てる
    const targetText = completeTarget.querySelector("p").innerText;
    completeList.appendChild(createCompleteTodoItem(targetText));
  });


  // 「削除」ボタンを作成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = "削除";
  deleteButton.classList.add("btn-delete");
  // 「削除」ボタンを押したときの処理
  deleteButton.addEventListener('click', () => {
    // 押された完了ボタンの親要素を未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    incompleteList.removeChild(deleteTarget);  
  });

  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  // 未完了リスト（.incomplete-area 内の ul）に li を追加
  incompleteList.appendChild(li);
};

const createCompleteTodoItem = (text) => {
  const completeLi = document.createElement('li');
  registerDragEvents(completeLi, 'complete');
  const completeDiv = document.createElement('div');
  const completeP = document.createElement('p');
  completeP.innerText = text;

  const returnTocompleteButton = document.createElement('button');
  returnTocompleteButton.innerText = "元に戻す";
  returnTocompleteButton.classList.add("btn-incomplete");
  returnTocompleteButton.addEventListener('click', () => {
    const returnTarget = returnTocompleteButton.closest("li");
    completeList.removeChild(returnTarget);
    createTodoItem(text);
  });

  completeDiv.appendChild(completeP);
  completeDiv.appendChild(returnTocompleteButton);
  completeLi.appendChild(completeDiv);
  return completeLi;
};

const allowDrop = (event) => event.preventDefault();

// 完了側にドロップされたときの処理
const handleDropToComplete = (event) => {
  event.preventDefault();
  if (!draggedContext || draggedContext.type !== 'incomplete') return;
  const text = draggedContext.element.querySelector('p').innerText;
  if (draggedContext.element.parentElement === incompleteList) {
    incompleteList.removeChild(draggedContext.element);
  }
  completeList.appendChild(createCompleteTodoItem(text));
  draggedContext = null;
};

// 未完了側にドロップされたときの処理
const handleDropToIncomplete = (event) => {
  event.preventDefault();
  if (!draggedContext || draggedContext.type !== 'complete') return;
  const text = draggedContext.element.querySelector('p').innerText;
  if (draggedContext.element.parentElement === completeList) {
    completeList.removeChild(draggedContext.element);
  }
  createTodoItem(text);
  draggedContext = null;
};

// ドロップ可能な領域をdivとulの双方に設定 完了側
[completeArea, completeList].forEach((target) => {
  target.addEventListener('dragover', allowDrop);
  target.addEventListener('drop', handleDropToComplete);
});
// ドロップ可能な領域をdivとulの双方に設定 未完了側
[incompleteArea, incompleteList].forEach((target) => {
  target.addEventListener('dragover', allowDrop);
  target.addEventListener('drop', handleDropToIncomplete);
});

// 追加ボタン（id="add_button"）をクリックしたら onClickAddTodo() を実行
document.getElementById('add_button').addEventListener('click', () => onClickAddTodo());
