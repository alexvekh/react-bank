// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Transaction = require('../class/transaction')
const TransactionHandler = require('../class/transactionHandler')
//  ==========================
const nick = new User('test1@mail.com', 'Password@1')
console.log('Created user:', nick)

const bob = new User('email@example.com', 'pasSw@rd123')
console.log('Created user:', bob)
bob.balance = 1222.35
console.log('Credit bob $1222.35')

//

try {
  TransactionHandler.processTransaction(
    'email@example.com',
    'test1@mail.com',
    11,
  )

  TransactionHandler.processTransaction(
    'email@example.com',
    'test1@mail.com',
    22,
  )

  TransactionHandler.processTransaction(
    'email@example.com',
    'test1@mail.com',
    33,
  )
} catch (error) {
  console.error(error)
}

console.log('Created 3 transactions')
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