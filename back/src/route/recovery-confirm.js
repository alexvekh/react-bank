// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { email, password, enteredCode } = req.body

  if (!enteredCode || !password) {
    // Check if email or password are missing
    return res
      .status(400)
      .json({ error: 'Code and password are required' })
  } else {
    const user = User.getUserByEmail(email)

    if (!user) {
      return res.status(409).json({
        error: "A user with this email isn't exists",
      })
    } else if (enteredCode !== user.code) {
      return res.status(409).json({
        error: 'Wrong code',
      })
    } else {
      user.password = password

      user.notifications.push(
        new Notification('Password recovered', 'Warning'),
      )
      user.isConfirmed = true
      user.isLogged = false

      res.status(201).json({
        message: 'Password is changed successfully',
        user: {
          isLogged: user.isLogged,
          token: user.token,
          email: user.email,
        },
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
