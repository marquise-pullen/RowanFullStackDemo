import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ setToDos }) => {
    const [newToDo, setNewToDo] = useState('');

    const handleChange = (e) => {
        setNewToDo(e.target.value);
    };

    const createTodo = () => {
        if (!newToDo) return; // Don't add empty tasks
        const todo = { description: newToDo };

        fetch(`${process.env.EXPRESS_URL}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo)
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            setToDos(toDos => [...toDos, data]);
            setNewToDo('');
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <div className="todo-input">
            <input
                type="text"
                value={newToDo}
                onChange={handleChange}
                placeholder="Add a new todo"
            />
            <button onClick={createTodo}>Add</button>
        </div>
    );
};

export default TodoForm;
