const Payment = require("../models/Payment");

exports.getPayments = (req, res) => {

  Payment.getPayments((err, results) => {

    if (err) return res.status(500).json(err);

    res.json(results);

  });
};

exports.createPayment = (req, res) => {

  Payment.createPayment(req.body, (err, result) => {

    if (err) return res.status(500).json(err);

    res.json({ message: "Payment registered" });

  });
};