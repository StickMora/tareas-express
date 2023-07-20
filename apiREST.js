const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = [
    { id: 1, description: 'Estudiar Express', completed: false },
    { id: 2, description: 'Asistir a clase de ingles', completed: true },
    { id: 3, description: 'Estudiar para el examen', completed: false },
];

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// Obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  res.status(200).json(task);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  task.title = req.body.title;
  task.completed = req.body.completed;
  res.status(200).json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

// Obtener tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter((t) => t.completed);
  res.status(200).json(completedTasks);
});

// Obtener tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  res.status(200).json(incompleteTasks);
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
