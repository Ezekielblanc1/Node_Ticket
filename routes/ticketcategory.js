const router = require('express').Router()
const { createCategory } = require('../controllers/ticketCategory')
router.post('/', createCategory)


module.exports = router