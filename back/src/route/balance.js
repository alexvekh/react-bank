// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.get('/', (req, res) => {
  const email = req.query.email

  if (!email) {
    return res
      .status(400)
      .json({ error: 'Email is required' })
  } else {
    const user = User.getUserByEmail(email)

    if (!user) {
      return res.status(409).json({
        error: 'User not found',
      })
    } else {
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
