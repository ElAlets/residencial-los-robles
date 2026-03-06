const Resident = require("../models/Resident");

exports.getAllResidents = (req, res) => {

  Resident.getResidents((err, results) => {

    if (err) return res.status(500).json(err);

    res.json(results);

  });
};

exports.createResident = (req, res) => {

  Resident.createResident(req.body, (err, result) => {

    if (err) return res.status(500).json(err);

    res.json({ message: "Resident created" });

  });
};