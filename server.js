const express = require('express');
const app = express();
const port = 3000;

const tareas = [
{ id: 1, description: 'Estudiar Express', completed: false },
  { id: 2, description: 'Asistir a clase de ingles', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];
app.get('/', (req, res) => {
    res.send(tareas);
});

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
