const express = require('express');
const gradesRouter = require('./routes/grades.js');

const app = express();

global.fileName = 'grades.json';

app.use(express.json());

app.use('/grade', gradesRouter);

app.listen(3000, () => {
  console.log('Rodando');
});
