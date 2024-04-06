const mongoose = require('mongoose');

// Schema
const todoSchema = new mongoose.Schema({
    description: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;