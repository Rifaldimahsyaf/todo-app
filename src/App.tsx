
import { useEffect, useState } from 'react';

import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/todos/TodoList';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let nextId = 3;

function App() {
  
// console.log('coba usestate');
// const [name, setName] = useState<string>('');
// const [count, setCount] = useState<number>(0);

const [search, setSearch] = useState('');
const [filter, setFilter] = useState('all');

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: 'Belajar React',
      done: true,
    },
    {
      id: 2,
      text: 'tes todo list',
      done: false,
    },
  ]);
  useEffect(() => {
    // console.log('coba useeffect');
  document.title = `Todo List (${todos.length})`;
  }, [todos]);

//  console.log('App render');


//   useEffect(() => {
//   // console.log('Count berubah');
// }, [count]);

  function handleAdd(text: string) {
    const newTodo: Todo = {
      id: nextId++,
      text,
      done: false,
    };

    setTodos([...todos, newTodo]);
  }

  function handleToggle(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  }

  function handleDelete(id: number) {
    setTodos(
      todos.filter((todo) => todo.id !== id)
    );
  }
  function handleEdit(id: number, text: string) {
  setTodos(
    todos.map((todo) =>
      todo.id === id
        ? { ...todo, text: text }
        : todo
    )
  );
}

const filteredTodos = todos.filter((todo) => {
  const matchesSearch = todo.text
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === 'all' ||
    (filter === 'done' && todo.done) ||
    (filter === 'active' && !todo.done);

  return matchesSearch && matchesFilter;
});

  const doneCount = todos.filter(
    (todo) => todo.done
  ).length;

  return (
    <>
    
    {/* <p>Name: {name}</p>

<input
  type="text"
  value={name}
  onChange={(event) => setName(event.target.value)}
  placeholder="Masukkan nama"
/>
    <p>Count: {count}</p>

<button onClick={() => setCount(count + 1)}>
  Tambah Count
</button> */}

      <Header
        total={todos.length}
        done={doneCount}
      />

      <TodoForm onAdd={handleAdd} />
<input
  type="text"
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  placeholder="Cari todo..."
/>

<div>
  <button onClick={() => setFilter('all')}>
    Semua
  </button>

  <button onClick={() => setFilter('active')}>
    Belum selesai
  </button>

  <button onClick={() => setFilter('done')}>
    Selesai
  </button>
</div>

<TodoList
  todos={filteredTodos}
  onToggle={handleToggle}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
    </>
  );
}

export default App;