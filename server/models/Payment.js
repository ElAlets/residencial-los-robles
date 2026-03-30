const db = require("../config/db");

const Payment = {

  // ==============================
  // OBTENER PAGOS
  // ==============================
  getPayments: async () => {
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.amount,
        p.payment_date,
        p.method,
        p.status,
        p.reference_number,
        u.name AS resident_name
      FROM payments p
      JOIN residents r ON p.resident_id = r.id
      JOIN users u ON r.user_id = u.id
      ORDER BY p.payment_date DESC
    `);

    return rows;
  },

  // ==============================
  // CREAR PAGO
  // ==============================
  createPayment: async (data) => {
    const { resident_id, amount, payment_date, method, status, reference_number } = data;

    const [result] = await db.query(
      `INSERT INTO payments 
       (resident_id, amount, payment_date, method, status, reference_number) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [resident_id, amount, payment_date, method, status, reference_number]
    );

    return {
      id: result.insertId,
      ...data
    };
  },

// OBTENER PAGOS DE UN USUARIO ESPECÍFICO
getPaymentsByUser: async (user_id) => {
  const [rows] = await db.query(`
    SELECT 
      p.id,
      p.amount,
      p.payment_date,
      p.method,
      p.status,
      p.reference_number,
      u.name AS resident_name
    FROM payments p
    JOIN residents r ON p.resident_id = r.id
    JOIN users u ON r.user_id = u.id
    WHERE u.id = ?
    ORDER BY p.payment_date DESC
  `, [user_id]);

  return rows;
}

};

module.exports = Payment;