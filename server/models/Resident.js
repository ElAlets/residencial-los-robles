const db = require("../config/db");

exports.getResidents = (callback) => {
  db.query("SELECT * FROM residents", callback);
};

exports.createResident = (resident, callback) => {

  const sql =
    "INSERT INTO residents (user_id, address, phone, house_number) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [
      resident.user_id,
      resident.address,
      resident.phone,
      resident.house_number
    ],
    callback
  );
};