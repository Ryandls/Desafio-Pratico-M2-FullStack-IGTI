import express from 'express';
import { promises as fs, writeFile } from 'fs';

const router = express.Router();

router.post('/', async (req, res) => {
  let grade = req.body;
  try {
    let json = JSON.parse(await fs.readFile(global.jsonGrades, 'utf-8'));

    grade = { id: json.nextId++, timestamp: new Date(), ...grade };
    json.grades.push(grade);

    await fs.writeFile(global.fileName, JSON.stringify(json));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let newInfo = req.body;

    let json = JSON.parse(await fs.readFile(global.jsonGrades, 'utf-8'));

    let index = json.grades.findIndex((grade) => grade.id === newInfo.id);

    if (newInfo.student) {
      json.grades[index].student = newInfo.student;
    }
    if (newInfo.subject) {
      json.grades[index].subject = newInfo.subject;
    }
    if (newInfo.type) {
      json.grades[index].type = newInfo.type;
    }
    if (newInfo.value) {
      json.grades[index].value = newInfo.value;
    }

    await fs.writeFile(global.jsonGrades, JSON.stringify(json));

    res.send(json.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
