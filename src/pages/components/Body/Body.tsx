// components/TodoList.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery<Todo[]>('/api/todos', async () => {
    const response = await axios.get('/api/todos');
    return response.data;
  });

  const addMutation = useMutation(
    (newTodo: { title: string }) =>
      axios.post('/api/todos', newTodo).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/todos');
      },
    }
  );

  const updateMutation = useMutation(
    (updatedTodo: Todo) =>
      axios.put(`/api/todos?id=${updatedTodo.id}`, updatedTodo).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/todos');
      },
    }
  );

  const deleteMutation = useMutation(
    (id: number) =>
      axios.delete(`/api/todos?id=${id}`).then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/api/todos');
      },
    }
  );

  const handleAddTodo = async () => {
    const newTodo = { title: prompt('Enter a new todo:'), completed: false };

    if (newTodo.title) {
      await addMutation.mutateAsync(newTodo);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    await updateMutation.mutateAsync(updatedTodo);
  };

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading todos</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      
      <table>
        <thead>
        <tr>
                <th><button onClick={handleAddTodo}>Add Todo</button></th>
            </tr>   
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Completed' : 'Incomplete'}</td>
              <td>
                <button onClick={() => handleUpdateTodo({ ...todo, completed: !todo.completed })}>
                  Toggle Complete
                </button>{' '}
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
