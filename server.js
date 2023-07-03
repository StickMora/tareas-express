const express = require('express');
const app = express();
const port = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const validateMethod = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    next();
  } else {
    res.status(405).send('Método HTTP no permitido');
  }
};

app.use(express.json());
app.use(validateMethod);

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(port, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
