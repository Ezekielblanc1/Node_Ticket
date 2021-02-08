const {
  createTicket,
  replyTicket,
  closeTicket,
  getTicketReplies,
} = require("../controllers/ticket");
const checkAuth = require("../middleware/auth");
const roleFunc = require("../middleware/roleCheck");
const router = require("express").Router();

router.post("/create", checkAuth, createTicket);
router.post("/reply_ticket", checkAuth, replyTicket);
router.post("/:ticketId", [checkAuth, roleFunc.isSupport], closeTicket);
router.get('/:ticketId/replies', checkAuth, getTicketReplies)

module.exports = router;
