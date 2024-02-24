const express = require('express');
const app = express();
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connectDb, getDb } = require('./modules/db');
const checkSecret = require('./modules/checkSecret');

const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/secrets/:id', async (req, res) => {
  const db = getDb();
  let id;

  try {
    id = new ObjectId(req.params.id);
  } catch (error) {
    res.sendStatus(400);

    return;
  }

  const secret = await db.collection('secrets').findOne({ _id: id });

  const result = checkSecret(secret);

  if (result === null) {
    res.sendStatus(404);

    return;
  }

  res.json(result);
})

app.post('/secrets/_create', async (req, res) => {
  const db = getDb();
  const secret = req.body;
  console.log(req.body);

  const result = await db.collection('secrets').insertOne({ secret });

  res.json({
    _id: result.insertedId,
    secret,
  });
});

app.delete('/secrets/_delete/:id', async (req, res) => {
  const db = getDb();
  let id;

  try {
    id = new ObjectId(req.params.id);
  } catch (error) {
    res.sendStatus(400);

    return;
  }

  const result = await db.collection('secrets').deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    res.sendStatus(404);

    return;
  }

  res.json({
    status: 'ok'
  });
});

connectDb()
  .then(() => {
    console.log('Connected successfully to server');

    app.listen(port, () => {
      console.log(`Приложение запущено и слушает порт ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
