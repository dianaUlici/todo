import './App.css';
import React from "react";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a simple todo",
      isDone: false,
      deadline: Date().toLocaleString('en-GB')
    }
  ]);

  function addTodo (text, deadline) {
    const newTodos = [...todos, { text,deadline}];
    setTodos(newTodos);
  }

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List Trial Day Diana</h1>
        <FormTodo addTodo={addTodo} />
        <div id="todoList">
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}{' '}
        {todo.deadline ? new Date(todo.deadline).toLocaleString('en-GB') : ""}
      </span>
      <div>
        <Button variant="outline-success" onClick={() =>
          markTodo(index)}>✓
        </Button> {' '}
        <Button variant="outline-danger" onClick={() =>
          removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function TextFile() {
  const element = document.createElement("a");
   const file = new Blob([document.getElementById('todoList').textContent],    
               {type: 'text/plain;charset=utf-8'});
   element.href = URL.createObjectURL(file);
   element.download = "myFile.txt";
   document.body.appendChild(element);
   element.click();
}

function FormTodo ({addTodo}) {
  const [text, setValue, deadline] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) 
      {
        alert("Item needs a text");
        return;
      }
    addTodo(text, deadline);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type ="text" className="input" value={text} onChange={e => setValue(e.target.value)} placeholder="Add new todo text" />
      <Form.Control type ="date" className="input" value={deadline} onChange={e => setValue(e.target.value)} placeholder="Add new todo deadline" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">Submit</Button>
    <Button variant="primary mb-3" onClick={TextFile}>Download tasks as text file</Button>
    </Form>
  );
}

export default App;
