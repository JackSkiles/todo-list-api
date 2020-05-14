const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Implement a REST API',
  },
  {
    id: 3,
    todo: 'Implement a REST API',
  },
  {
    id: 4,
    todo: 'Implement a REST API',
  },
];

app.get('/api/todos', (req, res)=> {
  res.json(todoList);
});

// GET /api/todos

app.get('/api/todos/:id', (req, res) => {
  const todo = 
    todoList.find((todo) => {
      return todo.id === Number.parseInt(req.params.id);
    }) || {};
  const status = Object.keys(todo).length ? 200 : 404;
  res.status(status).json(todo);
});
// GET /api/todos/:id

app.post('/api/todos', (req, res) => {
  if (!req.body.todo) {
    res.status(400).json({
      error: 'Please provide todo text'
    });
  } else {
    const maxId = todoList.reduce((max, currentTodo) => {
      if (currentTodo.id > max) {
        max = currentTodo.id;
      }
      return max;
    }, 0);

    const newTodo = {
      id: maxId + 1,
      todo: req.body.todo,
    };
    todoList.push(newTodo);
    res.json(newTodo);
  }
})
// POST /api/todos


app.put('/api/todos/:id', (req, res) => {
  if (!req.body.todo) {
    res.status(400).json({
      error: 'Please provide todo text',
    });
  }
  let updatedTodo = {};
  todoList.forEach((todo) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      todo.todo = req.body.todo;
      updatedTodo = todo;
    }
  });
  const status = Object.keys(updatedTodo).length ? 200 : 404;
  res.status(status).json(updatedTodo);
})
// PUT /api/todos/:id

app.delete('/api/todos/:id', (req, res) => {
  if (!req.body.todo) {
    res.status(400).json({
      error: 'Please provide a proper id',
    });
  }
  // let newTodoList = todoList;
  todoList.forEach((todo) => {
    if (todo.id === Number.parseInt(req.params.id)) {
      todoList.slice(todo.id, todo.id + 1);
    }
  })
  const status = Object.keys(updatedTodo).length ? 200 : 404;
  res.status(status).json(updatedTodo);
})
// DELETE /api/todos/:id

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
