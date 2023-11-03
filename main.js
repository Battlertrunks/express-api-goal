const Pool = require('pg').Pool;
const express = require("express");

const pool = new Pool({
  host: 'localhost',
  database: 'demo',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const app = express();
const port = 3400;

app.get('/', async (req, res) => {
  await pool.query('SELECT * FROM aircrafts', (error, results) => {
    try {
      res.status(200).json(results.rows);
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});