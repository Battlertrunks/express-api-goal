import { pool } from "../main.js";

const generateTicket = async (body) => {
  try {
    const {
      ticket_no,
      book_ref,
      passenger_id,
      passenger_name,
      contact_data
    } = body;

    let response = null;

    console.log('does this break')
    const book_ref_exists = (await pool.query(`SELECT * FROM bookings WHERE book_ref=$1;`, [book_ref])).rows;
    console.log(book_ref_exists);

    if (!book_ref_exists.length) {
      console.log('error here');
      throw new Error('book_ref does not exist.');
    }

    console.log('passes');

    const results = (await pool.query(`SELECT * FROM tickets;`)).rows;
    if (!results.find((result) => result.ticket_no === body.ticket_no)) {
      const text = `INSERT INTO tickets(
        ticket_no,
        book_ref,
        passenger_id,
        passenger_name,
        contact_data
        ) VALUES($1, $2, $3, $4, $5) RETURNING *
        `;

        const values = [
          ticket_no,
          book_ref,
          passenger_id,
          passenger_name,
          contact_data,
        ];

        response = await pool.query(text, values);
    }
    console.log('sends?')
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { generateTicket };
