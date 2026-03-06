const db = require("../config/db");

exports.getPayments = (callback) => {

  db.query("SELECT * FROM payments", callback);

};

exports.createPayment = (payment, callback) => {

  const sql =
    "INSERT INTO payments (resident_id, amount, payment_date, method, status) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      payment.resident_id,
      payment.amount,
      payment.payment_date,
      payment.method,
      payment.status
    ],
    callback
  );
};