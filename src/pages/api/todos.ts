
import { NextApiRequest, NextApiResponse } from 'next';


let todos = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build an API', completed: true },
  { id: 3, title: 'Create a Todo App', completed: false },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    
    const newTodo = req.body;
    todos = [...todos, { ...newTodo, id: todos.length + 1 }];
    res.status(201).json(newTodo);
  } else if (req.method === 'PUT') {
    
    const { id, ...updatedTodo } = req.body;
    todos = todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
    res.status(200).json(updatedTodo);
  } else if (req.method === 'DELETE') {
    
    const id = Number(req.query.id);
    todos = todos.filter((todo) => todo.id !== id);
    res.status(200).json({ id });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
