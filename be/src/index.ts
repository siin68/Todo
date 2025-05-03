import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './middleware/auth';
import { register, login } from './controllers/authController';
import { getTodos, createTodo, updateTodo, deleteTodo } from './controllers/todoController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Auth routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Todo routes
app.get('/api/todos', auth, getTodos);
app.post('/api/todos', auth, createTodo);
app.put('/api/todos/:id', auth, updateTodo);
app.delete('/api/todos/:id', auth, deleteTodo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 