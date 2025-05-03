"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todos = yield Todo_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todo = new Todo_1.default({
            name: req.body.name,
            completed: false,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
        });
        yield todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating todo' });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todo = yield Todo_1.default.findOneAndUpdate({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, { $set: req.body }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating todo' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todo = yield Todo_1.default.findOneAndDelete({ _id: req.params.id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting todo' });
    }
});
exports.deleteTodo = deleteTodo;
