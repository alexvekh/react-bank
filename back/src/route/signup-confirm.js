// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { email, enteredCode } = req.body
  const user = User.getUserByEmail(email)

  if (enteredCode !== user.code) {
    return res.status(409).json({
      error: 'Wrong code entered. Try again!',
    })
  } else {
    user.isConfirmed = true

    user.notifications.push(
      new Notification('Account confirmed!', 'Warning'),
    )
    return res.status(201).json({
      message: 'Code confirmed successfully',
      user: {
        isLogged: user.isLogged,
        token: user.token,
        email: user.email,
      },
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
