import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import sequelize from './config/db.js';
import './models/index.js';

const app = express();

const port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', './view');

app.use(express.static('public'));

app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to synchronize the database:', err);
  });

app.get('/', (req, res) => {
  res.render("index", { name: "Ayoub", classe: "JS" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});