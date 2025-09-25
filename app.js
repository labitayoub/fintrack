import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.set('view engine', 'ejs');

app.set('views', './view');

app.use(express.static('public'));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/', (req, res) => {
  res.render("index", { name: "Ayoub", classe: "JS" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});