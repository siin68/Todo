"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./middleware/auth");
const authController_1 = require("./controllers/authController");
const todoController_1 = require("./controllers/todoController");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Auth routes
app.post('/api/auth/register', authController_1.register);
app.post('/api/auth/login', authController_1.login);
// Todo routes
app.get('/api/todos', auth_1.auth, todoController_1.getTodos);
app.post('/api/todos', auth_1.auth, todoController_1.createTodo);
app.put('/api/todos/:id', auth_1.auth, todoController_1.updateTodo);
app.delete('/api/todos/:id', auth_1.auth, todoController_1.deleteTodo);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
