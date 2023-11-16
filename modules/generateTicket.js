import { pool } from "../main.js";

const generateTicket = async (body) => {
  try {
    const {
      ticket_no,
      booking_ref,
      passenger_id,
      passenger_name,
      contact_data
    } = body;

    let response = null;

    const results = (await pool.query(`SELECT * FROM tickets;`)).rows;
    if (!results.find((result) => result.ticket_no === body.ticket_no)) {
      const text = `INSERT INTO tickets(
        ticket_no,
        booking_ref,
        passenger_id,
        passenger_name,
        contact_data
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
        `;

        const values = [
          ticket_no,
          booking_ref,
          passenger_id,
          passenger_name,
          contact_data,
        ];

        response = await pool.query(text, values);
    }
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { generateTicket };
