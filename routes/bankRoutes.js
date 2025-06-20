const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getBalance, deposit, withdraw } = require("../controllers/bankController");

router.get("/balance", auth, getBalance);
router.post("/deposit", auth, deposit);
router.post("/withdraw", auth, withdraw);

module.exports = router;
