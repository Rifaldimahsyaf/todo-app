import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  todoSchema,
  type TodoFormData,
} from "../schemas/todoSchema";

import { useAddTodoMutation } from '../queries/useTodoQuery';

function TodoForm() {
  const addTodoMutation = useAddTodoMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: '',
    },
  });

  function onSubmit(data: TodoFormData) {
    addTodoMutation.mutate({
      text: data.text,
      done: false,
    });

    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register('text')}
        placeholder="Tulis tugas..."
      />

      {errors.text && (
        <p>{errors.text.message}</p>
      )}

      <button
        type="submit"
        disabled={addTodoMutation.isPending}
      >
        {addTodoMutation.isPending
          ? 'Menambahkan...'
          : 'Tambah'}
      </button>
    </form>
  );
}

export default TodoForm;
// import { useState } from 'react';

// type TodoFormProps = {
//   onAdd: (text: string) => void;
// };

// function TodoForm({ onAdd }: TodoFormProps) {
//   const [text, setText] = useState('');

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (text.trim() === '') {
//       return;
//     }

//     onAdd(text);

//     setText('');
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={text}
//         onChange={(event) => setText(event.target.value)}
//         placeholder="Tulis tugas..."
//       />

//       <button type="submit">
//         Tambah
//       </button>
//     </form>
//   );
// }

// export default TodoForm;