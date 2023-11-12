// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const TransactionHandler = require('../class/transactionHandler')
const Notification = require('../class/notification')

router.post('/', (req, res) => {
  console.log(req.body)
  const { paySystem, receiverEmail, amount } = req.body
  // Get paramenters

  // if no paramenters
  if (!paySystem || !receiverEmail || !amount) {
    console.log('!paySystem || !reciverEmail || !amount')
    return res.status(400).json({
      error:
        'Payment system, email and transaction amount are required',
    })
  }
  const user = User.getUserByEmail(receiverEmail)

  // if no user in the system
  if (!user) {
    console.log(
      `user with email ${receiverEmail} not found`,
    )
    return res.status(409).json({
      error: `A user with email ${receiverEmail} not found`,
    })
  }

  // parse to Float
  const transactionAmount = parseFloat(amount)
  console.log('user', user)
  console.log('user.balance', user.balance)
  user.balance = user.balance + transactionAmount

  user.notifications.push(
    new Notification(
      `You received $${transactionAmount} from ${paySystem}`,
      'Announcement',
    ),
  )
  console.log('user.balance', user.balance)
  console.log('TRANSACTED', user)

  res.status(201).json({
    message: `${amount} was received from ${paySystem}`,
    // user: {
    //   isLogged: user.isLogged,
    //   isConfirmed: user.isConfirmed,
    //   email: user.email,
    //   token: user.token,
    // },
  })
})

module.exports = router
