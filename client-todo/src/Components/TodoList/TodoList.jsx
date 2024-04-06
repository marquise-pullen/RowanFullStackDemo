import React from 'react';
import Todo from '../Todo/Todo';
import './TodoList.css'

const TodoList = ({ list, setToDos }) => {
    const onDelete = (id) => {
        fetch(`${process.env.EXPRESS_URL}/api/todos/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.status === 204 ? null : response.json();
        }).then(() => {
            setToDos(list.filter(todo => todo._id !== id));
        }).catch(e => {
            console.error(e);
        });
    };

    return (
        <ul className="todo-list">
            {
                list.map((todo, index) => {
                    return <Todo key={todo._id} id={todo._id} value={todo} onDelete={() => onDelete(todo._id)} />
                })
            }
        </ul>
    );
};

export default TodoList;