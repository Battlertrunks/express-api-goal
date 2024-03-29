import pg from 'pg';
import express from "express";
import { bookingSummary } from './modules/bookingSummary.js';
import { generateTicket } from './modules/generateTicket.js';
import { jsonFormatValidator } from './middleware/validation-check.js';

const pool = new pg.Pool({
  host: 'localhost',
  database: 'demo',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const app = express();
app.use(express.json());
const port = 3400;

app.get('/', async (req, res) => {
  await pool.query('SELECT * FROM aircrafts', (error, results) => {
    try {
      console.log('hi');
      return res.status(200).json(results.rows);
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

app.get('/booking-info', async (req, res) => {
  try {
    await bookingSummary();
    console.log('end');
    return res.sendStatus(200);
  } catch (error) {
    throw new Error(error.message);
  }
});

app.use('/new-ticket', jsonFormatValidator);
app.post('/new-ticket', async (req, res, next) => {
  try {
    console.log(req.body);
    const createdRoute = await generateTicket(req.body);
    console.log('hits here')
    return res.status(201).send(createdRoute);
  } catch (error) {
    console.log('wat is sent?');
    return res.status(error.status || 400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export {
  pool
};
