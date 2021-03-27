const express = require('express');

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

router.post('/', async (req, res) => {
  let grade = req.body;
  try {
    let json = Json.parse(readFile(global.filmeName, 'utf-8'));
    grade = { id: json.nextId++, timestamp: new Date(), ...grade };

    json.grades.push(grade);
    await writeFile(globa.fileName, JSON.stringify(json));
    res.end(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
