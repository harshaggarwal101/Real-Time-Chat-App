const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageController");
const { checkAuth } = require("../middleware/auth");

router.post("/messages/send", checkAuth, sendMessage);
router.get("/messages/:chatUserId", checkAuth, getAllMessages);

module.exports = router;
