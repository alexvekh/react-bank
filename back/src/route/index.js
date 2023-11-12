// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const signupRoute = require('./signup')
const signupConfirmRoute = require('./signup-confirm')
const signinRoute = require('./signin')
const recoveryRoute = require('./recovery')
const recoveryConfirmRoute = require('./recovery-confirm')
const balanceRoute = require('./balance')
const changeEmailRoute = require('./change-email')
const changePasswordRoute = require('./change-password')
const notificationsRoute = require('./notifications')
const transactionRoute = require('./transaction')
const sendRoute = require('./send')
const receiveRoute = require('./recive')

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є
router.use('/signup', signupRoute)
router.use('/signup-confirm', signupConfirmRoute)
router.use('/signin', signinRoute)
router.use('/recovery', recoveryRoute)
router.use('/recovery-confirm', recoveryConfirmRoute)
router.use('/balance', balanceRoute)
router.use('/change-email', changeEmailRoute)
router.use('/change-password', changePasswordRoute)
router.use('/notifications', notificationsRoute)
router.use('/transaction', transactionRoute)
router.use('/send', sendRoute)
router.use('/recive', receiveRoute)

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
