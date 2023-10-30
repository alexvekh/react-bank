// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.post('/', (req, res) => {
  console.log('1 pass', req.body)
  const { email, password } = req.body
  console.log('2 pass: ', email, password)

  if (!email || !password) {
    // Check if email or password are missing
    console.log('3- pass: !email || !password')
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    console.log('3+ pass: email and Password OK ')
    console.log(
      '4. GetUserByEmail:',
      User.getUserByEmail(email),
    )
    console.log(
      '4. Existing User:',
      User.existingUser(email),
    )

    const existingUser = User.getUserByEmail(email)

    if (existingUser && existingUser.email === email) {
      // Check if a user with the same email already exists
      console.log('5- pass: user exist')
      console.log(
        'error: A user with the same email already exists',
      )
      return res.status(409).json({
        error: 'A user with the same email already exists',
      })
    } else {
      console.log('5+ pass: user no exist')
      const user = new User(email, password)
      console.log('Created new user', user)

      res.status(201).json({
        message: 'User registered successfully',
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
