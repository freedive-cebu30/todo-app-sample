import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Todo as Process1Todo } from './process_1/Todo.jsx';
// 章が進むごとに下記のコメントを外すようにして下さい。
// 2章ならば、7行目と20行目の先頭にある「//」を外して下さい。

// import { Todo as Process2Todo } from './process_2/Todo.jsx';
// import { Todo as Process3Todo } from './process_3/Todo.jsx';
// import { Todo as Process4Todo } from './process_4/Todo.jsx';
// import { Todo as Process5Todo } from './process_5/Todo.jsx';
// import { Todo as Process6Todo } from './process_6/Todo.jsx';
// import { Todo as Process7Todo } from './process_7/Todo.jsx';
// import { Todo as Process8Todo } from './process_8/Todo.jsx';
// import { Todo as Process9Todo } from './process_9/Todo.jsx';
// import { Todo as Process10Todo } from './process_10/Todo.jsx';
// import { Todo as Process11Todo } from './process_11/Todo.jsx';
// import { Todo as Process12Todo } from './process_12/Todo.jsx';

const COMPONENT_MAP = {
  process1: Process1Todo,
  // process2: Process2Todo,
  // process3: Process3Todo,
  // process4: Process4Todo,
  // process5: Process5Todo,
  // process6: Process6Todo,
  // process7: Process7Todo,
  // process8: Process8Todo,
  // process9: Process9Todo,
  // process10: Process10Todo,
  // process11: Process11Todo,
  // process12: Process12Todo,
};

const params = new URLSearchParams(window.location.search);
const processKey = params.get('process') ?? 'process1';
const ActiveComponent = COMPONENT_MAP[processKey] ?? COMPONENT_MAP.process1;
console.log(`Rendering component for: ${processKey}`);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActiveComponent />
  </StrictMode>,
);
