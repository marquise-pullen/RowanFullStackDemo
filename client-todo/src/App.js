import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './Components/TodoList/TodoList';
import TodoTitle from './Components/TodoTitle/TodoTitle';
import TodoForm from './Components/TodoForm/TodoForm';
import DualForm from './Components/DualForm/DualForm';

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (!isAuthenticated)
      return;

    fetch(`${process.env.EXPRESS_URL}/api/todos`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not OK');
        }
        return resp.json();
      })
      .then((data) => {
        setToDos(data);
      }).catch((e) => {
        console.log(e)
      })

  }, [isAuthenticated]);

  useEffect(() => {

    let tempCount = toDos.length;
    setCount(tempCount);
  }, [toDos]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderAuthenticatedApp = () => (
    <>
      <div>{isAuthenticated ? `Welcome back ${username}` : " "}</div>
      <TodoTitle title="To-Do Demo" count={count} />
      <TodoForm setToDos={setToDos} />
      <TodoList list={toDos} setToDos={setToDos} />
    </>
  );

  return (
    <div className="app">

      {isAuthenticated ? renderAuthenticatedApp() : <DualForm onLoginSuccess={handleAuthSuccess} onRegisterSuccess={handleAuthSuccess} setUsername={setUsername} />}
    </div>
  );
}

export default App;