// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.post('/', (req, res) => {
  console.log('signupConfirm req.body', req.body)
  const { email, enteredCode } = req.body
  console.log('email and enteredCode: ', email, enteredCode)
  const user = User.getUserByEmail(email)

  if (enteredCode !== user.code) {
    return res.status(400).json({
      error: 'Invalid code',
    })
  } else {
    res.status(200).json({
      message: 'Code confirmed successfully',
      user: {
        isLogged: user.isLogged,
        isConfirmed: user.isConfirmed,
        email: user.email,
        token: user.token,
      },
    })
  }
})

// Експортуємо глобальний роутер
module.exports = router
