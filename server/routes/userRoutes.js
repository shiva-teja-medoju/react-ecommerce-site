const express = require('express')


const router = express.Router()

const {registerUser, loginUser, testMail, forgotPassword} = require('../controllers/userControllers')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/test-mail', testMail)

router.post('/forgot-password', forgotPassword )



module.exports = router 