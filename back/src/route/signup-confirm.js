// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.post('/', (req, res) => {
  console.log('req.body', req.body)
  const { email, enteredCode } = req.body
  const user = User.getUserByEmail(email)
  console.log(user)
  console.log(
    'email and enteredCode: ',
    email,
    enteredCode,
    'user.code',
    user.code,
  )

  if (enteredCode !== user.code) {
    console.log('Invalid code')
    return res.status(409).json({
      error: 'Invalid code',
    })
  } else {
    console.log('Good code')
    user.isConfirmed = true
    console.log('user.isConfirmed', user)

    return res.status(201).json({
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
