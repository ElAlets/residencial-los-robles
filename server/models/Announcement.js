const db = require("../config/db");

exports.getAnnouncements = (callback) => {
  const sql = "SELECT * FROM announcements ORDER BY created_at DESC";
  db.query(sql, callback);
};

exports.createAnnouncement = (announcement, callback) => {

  const sql = `
    INSERT INTO announcements (title, content, created_by)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      announcement.title,
      announcement.content,
      announcement.created_by
    ],
    callback
  );
};