const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authMiddleware = require('../middleware/authMiddleware');

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.put("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

router.post("/:id/join", groupController.joinGroup);
router.post("/:id/leave", groupController.leaveGroup);

router.get("/:id/messages", authMiddleware, groupController.getMessages);
router.post("/:id/message", authMiddleware, groupController.sendMessage);

module.exports = router;
