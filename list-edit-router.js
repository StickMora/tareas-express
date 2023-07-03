const express = require('express');
const router = express.Router();


function errorSolicitud(req, res, next) {
  if (req.method === 'POST' && Object.keys(req.body).length === 0) {
    return res.status(400).send('El cuerpo de la solicitud está vacío');
  }

  if (req.method === 'POST') {
    const { id, description, completed } = req.body;
    if (!id || !description || completed === undefined) {
      return res.status(400).send('La solicitud POST tiene información no válida o atributos faltantes');
    }
  }

  if (req.method === 'PUT' && Object.keys(req.body).length === 0) {
    return res.status(400).send('El cuerpo de la solicitud está vacío');
  }

  if (req.method === 'PUT') {
    const { description, completed } = req.body;
    if (!description || completed === undefined) {
      return res.status(400).send('La solicitud PUT tiene información no válida o atributos faltantes');
    }
  }
  next();
}

const tareas = [
  { id: 1, description: 'Estudiar Express', completed: false },
  { id: 2, description: 'Asistir a clase de ingles', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];

router.post('/', errorSolicitud, (req, res) => {
  const { id, description, completed } = req.body;
  const nuevaTarea = { id, description, completed };

  tareas.push(nuevaTarea);
  res.send('Tarea creada exitosamente');
});

router.delete('/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);

  const index = tareas.findIndex(tarea => tarea.id === tareaId);
  if (index !== -1) {
    tareas.splice(index, 1);
    res.send('Tarea eliminada exitosamente');
  } else {
    res.status(404).send('No se encontró la tarea');
  }
});

router.put('/:id', errorSolicitud, (req, res) => {
  const tareaId = parseInt(req.params.id);
  const { description, completed } = req.body;

  const tarea = tareas.find(t => t.id === tareaId);
  if (tarea) {
    tarea.description = description || tarea.description;
    tarea.completed = completed || tarea.completed;
    res.send('Tarea actualizada exitosamente');
  } else {
    res.status(404).send('No se encontró la tarea');
  }
});

module.exports = router;
