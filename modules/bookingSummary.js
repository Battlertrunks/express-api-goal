import { pool } from "../main.js";

const bookingSummary = async () => {
  try {
    const result = await pool.query('SELECT * FROM tickets JOIN bookings ON tickets.book_ref = bookings.book_ref;');
    console.log(result);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { bookingSummary };
