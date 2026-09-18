import { useEffect, useState } from 'react';

import { useGetTodosQuery } from './queries/useTodoQuery';

import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/todos/TodoList';

/*
type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let nextId = 3;
*/

function App() {
  
  // console.log('coba usestate');
  // const [name, setName] = useState<string>('');
  // const [count, setCount] = useState<number>(0);

  /*
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  */

  /*
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
  */

  /*
  useEffect(() => {
    // console.log('coba useeffect');
    document.title = `Todo List (${todos.length})`;
  }, [todos]);
  */

  // console.log('App render');

  /*
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
  */

  /*
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

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === 'az') {
      return a.text.localeCompare(b.text);
    }

    if (sort === 'za') {
      return b.text.localeCompare(a.text);
    }

    return 0;
  });
  */

  /*
  const doneCount = todos.filter(
    (todo) => todo.done
  ).length;
  */

  

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useGetTodosQuery();

  
  useEffect(() => {
    document.title = `Todo List (${todos.length})`;
  }, [todos]);

  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Gagal mengambil data Todo.</p>;
  }

 
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
        done={todos.filter(
          (todo) => todo.done
        ).length}
      />

      <TodoForm />

      {/*
      ==========================================
      SEARCH, FILTER, SORTING

      DIPINDAHKAN KE TodoList.tsx
      ==========================================

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

      <div>
        <label htmlFor="sort">
          Urutkan:
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">
            Default
          </option>

          <option value="az">
            A - Z
          </option>

          <option value="za">
            Z - A
          </option>
        </select>
      </div>
      */}

      <TodoList
        todos={todos}
      />
    </>
  );
}

export default App;