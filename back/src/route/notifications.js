// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

//  ==========================

//=======================
router.get('/', (req, res) => {
  console.log('GET request')
  const email = req.query.email

  if (!email) {
    // Check if email or password are missing
    console.log(!email)
    return res
      .status(400)
      .json({ error: 'Email is required' })
  } else {
    const user = User.getUserByEmail(email)
    console.log(user)

    if (!user) {
      // Check if a user with the same email already exists
      console.log('user not find')
      return res.status(409).json({
        error: 'User not find',
      })
    } else {
      console.log('user', user)
      res.status(201).json({
        user: {
          balance: user.balance,
          transactions: user.transactions,
        },
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
