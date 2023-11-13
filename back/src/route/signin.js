// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const testData = require('./test')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  console.log('signin  req.body', req.body)
  const { email, password } = req.body
  console.log('signin email, password: ', email, password)

  if (!email || !password) {
    // Check if email or password are missing
    console.log('3- pass: !email || !password')
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    console.log('email and Password', email.password)
    const user = User.getUserByEmail(email)
    console.log(user)

    if (!user) {
      // Check if a user with the same email already exists

      return res.status(409).json({
        error: "A user with this email isn't exists",
      })
    } else if (user.password !== password) {
      return res.status(409).json({
        error: 'Wrong password',
      })
    } else {
      user.isLogged = true

      user.notifications.push(
        new Notification('New login', 'Warning'),
      )

      res.status(201).json({
        message: 'User is logged successfully',
        user: {
          isLogged: user.isLogged,
          isConfirmed: user.isConfirmed,
          token: user.token,
          email: user.email,
        },
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
