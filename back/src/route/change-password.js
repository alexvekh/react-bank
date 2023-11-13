// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { userEmail, oldPassword, newPassword } = req.body

  if (!userEmail || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    const user = User.getUserByEmail(userEmail)

    if (!user) {
      return res.status(409).json({
        error: 'A user with this email is not exists',
      })
    } else {
      if (user.password !== oldPassword) {
        return res.status(409).json({
          error: 'Wrong password',
        })
      } else {
        user.password = newPassword

        user.notifications.push(
          new Notification(
            'Your password was changed',
            'Warning',
          ),
        )
        user.isLogged = false
        res.status(201).json({
          message: 'Password was changed successfully',
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

module.exports = router
