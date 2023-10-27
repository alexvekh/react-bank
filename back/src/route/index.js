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
    return res
      .status(400)
      .json({ error: 'Email and password are required' })
  }
  console.log('3 pass')

  if (User.getUserByEmail(email)) {
    // Check if a user with the same email already exists
    console.log('4 pass')
    return res.status(409).json({
      error: 'A user with the same email already exists',
    })
  } else {
    const user = new User(email, password)
    User.users.push(user)
    console.log(allUsers)

    res
      .status(201)
      .json({ message: 'User registered successfully' })
  }
})

// Експортуємо глобальний роутер
module.exports = router
