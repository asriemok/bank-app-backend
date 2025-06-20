const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = []; // Mock DB

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, password: hashed };
  users.push(user);
  res.json({ message: "Registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

exports.getUsers = () => users;
