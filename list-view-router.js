const express = require('express');
const express = require('express');
const router = express.Router();

const tareas = [
  { id: 1, description: 'Estudiar Express', completed: false },
  { id: 2, description: 'Asistir a clase de ingles', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];

function verificarParametros(req, res, next) {
  const { tipo } = req.query;
  
  if (!tipo || (tipo !== 'completas' && tipo !== 'incompletas')) {
    return res.status(400).send('Parámetros incorrectos');
  } 
  next();
}

router.get('/completas', verificarParametros, (req, res) => {
  const completas = tareas.filter(tarea => tarea.completed);
  res.send(completas);
});

router.get('/incompletas', verificarParametros, (req, res) => {
  const incompletas = tareas.filter(tarea => !tarea.completed);
  res.send(incompletas);
});

module.exports = router;