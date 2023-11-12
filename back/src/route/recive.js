// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  const { paySystem, receiverEmail, amount } = req.body
  // Get paramenters

  // if no paramenters (ckecked before fetch but just in case)
  if (!paySystem || !receiverEmail || !amount) {
    return res.status(400).json({
      error:
        'Payment system, email and transaction amount are required',
    })
  }
  const user = User.getUserByEmail(receiverEmail)

  // if no user in the system
  if (!user) {
    return res.status(409).json({
      error: `A user with email ${receiverEmail} not found`,
    })
  }
  // parse to Float
  const transactionAmount = parseFloat(amount)
  user.balance += transactionAmount

  user.notifications.push(
    new Notification(
      `$${transactionAmount} received from ${paySystem}`,
      'Announcement',
    ),
  )

  user.transactions.push({
    id: user.transactions.length + 1,
    correspondent: paySystem,
    timestamp: new Date(),
    type: 'Receipt',
    amount: transactionAmount,
  })

  res.status(201).json({
    message: `${amount} was received from ${paySystem}`,
  })
})

module.exports = router
