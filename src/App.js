import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
 
function App() {
  
  // STATES: UPDATES UI IN RESPONSE TO EVENT HANDLERS
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // RUN ONCE WHEN APP STARTS
  useEffect (() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
          setFilteredTodos(todos);
          break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todo", JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return (
    <div className = "App">
      <header>
        <h1>Watch List</h1>
        
      </header>
      <div class = "description">Keep track of what you watch</div>
      <Form 
        inputText = {inputText}
        todos = {todos} 
        setTodos = {setTodos} 
        setInputText = {setInputText} 
        setStatus = {setStatus}
        />
      <TodoList  
        setTodos = {setTodos} 
        filteredTodos = {filteredTodos}
        todos = {todos} />
    </div>
  );
}

export default App;
