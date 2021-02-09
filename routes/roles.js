const { createRole } = require("../controllers/roles");
const checkAuth = require("../middleware/auth");
const roleFunc = require("../middleware/roleCheck");
const router = require("express").Router();

router.post("/create", [checkAuth, roleFunc.isAdmin],createRole);
module.exports = router;
