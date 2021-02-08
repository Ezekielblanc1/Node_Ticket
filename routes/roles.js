const { createRole } = require("../controllers/roles");

const router = require("express").Router();

router.post("/create", createRole);
module.exports = router;
