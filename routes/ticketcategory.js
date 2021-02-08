const router = require('express').Router()
const { createCategory } = require('../controllers/ticketCategory')
router.post('/create', createCategory)


module.exports = router