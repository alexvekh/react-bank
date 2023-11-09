// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.post('/', (req, res) => {
  console.log('settings req.body', req.body)
  const { userEmail, oldPassword, newPassword } = req.body

  console.log(
    'userEmail, oldPassword, newPassword: ',
    userEmail,
    oldPassword,
    newPassword,
  )

  if (!userEmail || !oldPassword || !newPassword) {
    console.log('!email || !password')
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    console.log(' userEmail, oldPassword, newPassword OK ')

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
        user.isLogged = false
        res.status(201).json({
          message: 'Password was changed successfully',
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
