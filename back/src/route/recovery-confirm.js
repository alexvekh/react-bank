// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  console.log('signin  req.body', req.body)
  const { email, password, enteredCode } = req.body
  console.log(
    'email, password, code: ',
    email,
    password,
    enteredCode,
  )

  if (!enteredCode || !password) {
    // Check if email or password are missing
    console.log('!code || !password')
    return res
      .status(400)
      .json({ error: 'Code and password are required' })
  } else {
    const user = User.getUserByEmail(email)
    console.log(user)

    if (!user) {
      // Check if a user with the same email already exists
      console.log('user not exist')
      return res.status(409).json({
        error: "A user with this email isn't exists",
      })
    } else if (enteredCode !== user.code) {
      console.log('wrong code')
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
      console.log('user with new password', user)
      //User.getUserByEmail(user.email).isLogged = true
      //console.log(User.getUserByEmail(user.email))

      res.status(201).json({
        message: 'Password is changed successfully',
        user: {
          isLogged: user.isLogged,
          isConfirmed: user.isConfirmed,
          email: user.email,
          token: user.token,
        },
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
