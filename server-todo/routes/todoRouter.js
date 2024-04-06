var express = require('express');
var router = express.Router();
let Todo = require('../models/Todo')

// GET: localhost:3001/todos
router.get("/", async (req, res) => {

    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST: localhost:3001/items
router.post("/", async (req, res) => {
    const { description } = req.body;
    const todo = new Todo({
        description
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

// PUT: localhost:3001/items/id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { description, completed } = req.body;

    try {
        const updatedTodo = await Todos.findByIdAndUpdate(
            id,
            { description, completed },
            { new: true }
        );
        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE: localhost:3001/todos/id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            res.status(204).send(deletedTodo); // No content to send back
        } else {
            res.status(404).send(`Todo not found with ID:${id}`);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
