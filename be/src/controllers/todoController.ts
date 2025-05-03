import { Request, Response } from 'express';
import Todo from '../models/Todo';

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ userId: req.user?.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = new Todo({
      name: req.body.name,
      completed: false,
      userId: req.user?.id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      { $set: req.body },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting todo' });
  }
}; 