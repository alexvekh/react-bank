// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  console.log('settings req.body', req.body)
  const { userEmail, newEmail, password } = req.body

  console.log(
    'userEmail, newEmail, password: ',
    userEmail,
    newEmail,
    password,
  )

  if (!userEmail || !newEmail || !password) {
    console.log('!email || !password')
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    console.log(' email and Password OK ')

    console.log(
      '4. GetUserByEmail:',
      User.getUserByEmail(userEmail),
    )

    const user = User.getUserByEmail(userEmail)

    if (!user) {
      console.log('error: No User')
      return res.status(409).json({
        error: 'A user with the same email already exists',
      })
    } else {
      if (user.password !== password) {
        console.log('error: Wrong password')
        return res.status(409).json({
          error: 'Wrong password',
        })
      } else {
        console.log('Ok', user)
        user.email = newEmail
        const Notification = require('../class/notification')
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
            isConfirmed: user.isConfirmed,
            email: user.email,
            token: user.token,
          },
        })
      }
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
