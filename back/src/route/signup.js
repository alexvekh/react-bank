// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    // Check if email or password are missing
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    const existingUser = User.getUserByEmail(email)

    if (existingUser && existingUser.email === email) {
      // Check if a user with the same email already exists

      return res.status(409).json({
        error: 'A user with the same email already exists',
      })
    } else {
      const user = new User(email, password)

      console.log('new user created: ', user)

      user.notifications.push(
        new Notification('Acount created', 'Announcement'),
      )

      res.status(201).json({
        message: 'User registered successfully',
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
