const {
  createTicket,
  replyTicket,
  closeTicket,
  getTicketReplies,
  getOpenTickets,
  getClosedTickets,
  getClosedTicketForLastMonth,
  getUserTicket
} = require("../controllers/ticket");
const checkAuth = require("../middleware/auth");
const roleFunc = require("../middleware/roleCheck");
const router = require("express").Router();

router.post("/create", checkAuth, createTicket);
router.post("/reply_ticket", checkAuth, replyTicket);
router.post("/:ticketId", [checkAuth, roleFunc.isSupport], closeTicket);
router.get("/:ticketId/replies", checkAuth, getTicketReplies);
router.get("/open", [checkAuth, roleFunc.isSupport], getOpenTickets);
router.get("/closed", [checkAuth, roleFunc.isSupport], getClosedTickets);
router.get('/:userId', checkAuth, getUserTicket)
router.get('/support/closed', [checkAuth, roleFunc.isSupport], getClosedTicketForLastMonth)

module.exports = router;
