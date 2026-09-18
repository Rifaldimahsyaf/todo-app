import axios from 'axios';

import type { Todo } from '../types/todo';

const API_URL = 'http://localhost:3000';

export async function getTodosService(): Promise<Todo[]> {
  const response = await axios.get<Todo[]>(`${API_URL}/todos`);

  return response.data;
}

export async function addTodoService(
  todo: Omit<Todo, 'id'>
): Promise<Todo> {
  const response = await axios.post<Todo>(`${API_URL}/todos`, todo);

  return response.data;
}
export async function updateTodoService(
  id: string,
  todo: Partial<Omit<Todo, 'id'>>
): Promise<Todo> {
  const response = await axios.patch<Todo>(
    `${API_URL}/todos/${id}`,
    todo
  );

  return response.data;
}

export async function deleteTodoService(
  id: string
): Promise<void> {
  await axios.delete(
    `${API_URL}/todos/${id}`
  );
}