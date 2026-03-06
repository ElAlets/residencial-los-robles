const Announcement = require("../models/Announcement");

exports.getAnnouncements = (req, res) => {

  Announcement.getAnnouncements((err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);

  });

};

exports.createAnnouncement = (req, res) => {

  Announcement.createAnnouncement(req.body, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Announcement created successfully"
    });

  });

};