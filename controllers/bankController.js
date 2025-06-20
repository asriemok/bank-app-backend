const accounts = {};
const { simulatePayment } = require("../services/paymentGateway");
const { getUsers } = require("./authController");

exports.getBalance = (req, res) => {
  const balance = accounts[req.user.id] || 0;
  res.json({ balance });
};

exports.deposit = async (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

  const success = await simulatePayment("deposit", amount);
  if (!success) return res.status(500).json({ message: "Payment failed" });

  accounts[req.user.id] = (accounts[req.user.id] || 0) + amount;
  res.json({ balance: accounts[req.user.id] });
};

exports.withdraw = async (req, res) => {
  const amount = parseFloat(req.body.amount);
  const current = accounts[req.user.id] || 0;
  if (amount <= 0 || amount > current) return res.status(400).json({ message: "Invalid amount" });

  const success = await simulatePayment("withdraw", amount);
  if (!success) return res.status(500).json({ message: "Payment failed" });

  accounts[req.user.id] -= amount;
  res.json({ balance: accounts[req.user.id] });
};
