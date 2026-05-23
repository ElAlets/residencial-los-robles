// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// REGISTER
// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validaciones
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Seguridad:
    // Solo permitir admin si viene de un admin autenticado
    const safeRole = role === "admin" ? "resident" : "resident";

    const newUser = await User.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "resident",
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findByEmail(email.trim().toLowerCase());

    // Mensaje genérico para seguridad
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};
