import { useState } from 'react';

import { useGetTodosQuery } from '../../queries/useTodoQuery';
import TodoItem from './TodoItem';

function TodoList() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Gagal mengambil data Todo.</p>;
  }

  const searchedTodos = todos?.filter((todo) =>
    todo.text
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredTodos = searchedTodos?.filter((todo) => {
    if (filter === 'active') {
      return !todo.done;
    }

    if (filter === 'completed') {
      return todo.done;
    }

    return true;
  });

  const sortedTodos = [...(filteredTodos ?? [])].sort(
    (a, b) => {
      if (sort === 'az') {
        return a.text.localeCompare(b.text);
      }

      if (sort === 'za') {
        return b.text.localeCompare(a.text);
      }

      return 0;
    }
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Cari Todo..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value)
          }
        >
          <option value="all">Semua</option>
          <option value="active">Belum selesai</option>
          <option value="completed">Selesai</option>
        </select>

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
        >
          <option value="default">Default</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>

      <ul>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
// import TodoItem from './TodoItem';

// type Todo = {
//   id: number;
//   text: string;
//   done: boolean;
// };

// type TodoListProps = {
//   todos: Todo[];
//   onToggle: (id: number) => void;
//   onDelete: (id: number) => void;
//   onEdit: (id: number, text: string) => void;
// };

// function TodoList({
//   todos,
//   onToggle,
//   onDelete,
//   onEdit,
// }: TodoListProps) {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <TodoItem
//           key={todo.id}
//           todo={todo}
//           onToggle={onToggle}
//           onDelete={onDelete}
//           onEdit={onEdit}
//         />
//       ))}
//     </ul>
//   );
// }

// export default TodoList;