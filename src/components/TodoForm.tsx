import { useState } from 'react';

type TodoFormProps = {
  onAdd: (text: string) => void;
};

function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (text.trim() === '') {
      return;
    }

    onAdd(text);

    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Tulis tugas..."
      />

      <button type="submit">
        Tambah
      </button>
    </form>
  );
}

export default TodoForm;