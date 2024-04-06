import React from 'react';

const Todo = ({ id, value, onDelete }) => {
    return (
        <li>
            <span className="todo-description">{value.description}</span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default Todo;