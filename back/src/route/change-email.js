// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { userEmail, newEmail, password } = req.body

  if (!userEmail || !newEmail || !password) {
    // validated on front-end before fetch but juct in case
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    const user = User.getUserByEmail(userEmail)

    if (!user) {
      return res.status(409).json({
        error: 'Not found your profile',
      })
    } else {
      if (user.password !== password) {
        return res.status(409).json({
          error: 'Wrong password',
        })
      } else {
        user.email = newEmail
        user.notifications.push(
          new Notification(
            'Your email was changed',
            'Warning',
          ),
        )
        user.isLogged = false
        user.isConfirmed = false
        res.status(201).json({
          message: 'Email changed successfully',
          user: {
            isLogged: user.isLogged,
            token: user.token,
            email: user.email,
          },
        })
      }
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
