// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const User = require('../class/User')

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/signup', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  console.log('1 pass')
  console.log(email, password)
  console.log('2 pass')

  if (!email || !password) {
    // Check if email or password are missing
    console.log('3 pass: !email || !password')
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  } else {
    console.log('3 pass: email and Password OK ')
    console.log('Existing User from index:', existingUser)

    if (User.getUserByEmail(email)) {
      // Check if a user with the same email already exists
      console.log('4 pass: user exist')
      return res.status(409).json({
        error: 'A user with the same email already exists',
      })
    } else {
      console.log('5 pass: user no exist')
      const user = new User(email, password)
      console.log('Created new user', user)
      User.users.push(user)
      console.log('allUsers', allUsers)
      console.log('User.users', User.users)

      res.status(201).json({
        message: 'User registered successfully',
        token: user.token,
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
