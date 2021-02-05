const { login, signup } = require('../controllers/user');

const router = require('express').Router()

router.post('/', login)
router.post('/', signup)
module.exports = router;