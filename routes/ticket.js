const { createTicket } = require("../controllers/ticket");

const router = require("express").Router();

router.post('/create', createTicket)
module.exports = router;
