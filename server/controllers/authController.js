const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {

  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  User.createUser(
    { name, email, password: hashedPassword, role },
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: "User created successfully" });

    }
  );
};

exports.login = (req, res) => {

  const { email, password } = req.body;

  User.findByEmail(email, async (err, results) => {

    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "8h" }
);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  });
};