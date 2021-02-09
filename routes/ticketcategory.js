const router = require('express').Router()
const { createCategory } = require('../controllers/ticketCategory')
const checkAuth = require("../middleware/auth");
const roleFunc = require("../middleware/roleCheck");
router.post('/create', [checkAuth, roleFunc.isAdmin], createCategory)


module.exports = router