// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Transaction = require('../class/transaction')

//  ==========================

//=======================
router.get('/', (req, res) => {
  console.log('GET request')
  console.log('req.query :', req.query)
  const email = req.query.email
  const transactionId = Number(req.query.id)
  console.log('transactionId :', transactionId)

  if (!email || !transactionId) {
    // Check if email or password are missing
    console.log(!email)
    return res.status(400).json({
      error: 'Email and transaction id is required',
    })
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
      const transaction =
        user.getUserTransactionById(transactionId)

      res.status(201).json({
        transaction,
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
