const express = require('express');
const app = express();
const port = 3000;

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json());

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(port, () => {
  console.log('Servidor iniciado en el puerto 3000');
});