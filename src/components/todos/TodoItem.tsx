import { useState } from 'react';

import type { Todo } from '../../types/todo';

import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../../queries/useTodoQuery';

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  console.log(
    'TodoItem render:',
    todo.id,
    'isEditing:',
    isEditing
  );

  function handleEdit() {
    if (editText.trim() === '') {
      return;
    }

    updateTodoMutation.mutate({
      id: todo.id,
      data: {
        text: editText,
      },
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleToggle() {
    updateTodoMutation.mutate({
      id: todo.id,
      data: {
        done: !todo.done,
      },
    });
  }

  function handleDelete() {
    deleteTodoMutation.mutate(todo.id);
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(event) =>
              setEditText(event.target.value)
            }
          />

          <button
            onClick={handleEdit}
            disabled={updateTodoMutation.isPending}
          >
            {updateTodoMutation.isPending
              ? 'Menyimpan...'
              : 'Simpan'}
          </button>

          <button onClick={handleCancel}>
            Batal
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={handleToggle}
              disabled={updateTodoMutation.isPending}
            />

            {todo.done ? (
              <s>{todo.text}</s>
            ) : (
              todo.text
            )}
          </label>

          <button
            onClick={handleDelete}
            disabled={deleteTodoMutation.isPending}
          >
            {deleteTodoMutation.isPending
              ? 'Menghapus...'
              : 'Hapus'}
          </button>

          <button onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;