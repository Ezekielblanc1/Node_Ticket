const { createTicket, replyTicket } = require("../controllers/ticket");

const router = require("express").Router();

router.post('/create', createTicket)
router.post('/reply_ticket', replyTicket )


module.exports = router;
