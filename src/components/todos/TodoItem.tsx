import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  //     console.log('TodoItem render:', todo.id, 'isEditing:', isEditing);

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

    onEdit(todo.id, editText);

    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
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

          <button onClick={handleEdit}>
            Simpan
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
              onChange={() => onToggle(todo.id)}
            />

            {todo.text}
          </label>

          <button onClick={() => onDelete(todo.id)}>
            Hapus
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