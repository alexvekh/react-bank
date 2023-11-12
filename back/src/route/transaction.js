// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Transaction = require('../class/transaction')

//  ==========================

//=======================
router.get('/', (req, res) => {
  const email = req.query.email
  const transactionId = Number(req.query.id)

  if (!email || !transactionId) {
    return res.status(400).json({
      error: 'Email and transaction id is required',
    })
  } else {
    const user = User.getUserByEmail(email)

    if (!user) {
      return res.status(409).json({
        error: 'User not found',
      })
    } else {
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
