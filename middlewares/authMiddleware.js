const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
