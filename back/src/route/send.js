// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')
const TransactionHandler = require('../class/transactionHandler')

router.post('/', (req, res) => {
  const { senderEmail, reciverEmail, amount } = req.body
  // Get paramenters

  // if no paramenters
  if (!senderEmail || !reciverEmail || !amount) {
    console.log('!senderEmail || !reciverEmail || !amount')
    return res.status(400).json({
      error: 'Email and transaction amount are required',
    })
  }

  // if no user in the system
  if (!User.existingUser(reciverEmail)) {
    console.log(`user with email ${reciverEmail} not found`)
    return res.status(409).json({
      error: `A user with email ${reciverEmail} not found`,
    })
  }

  // parse to Float
  const transactionAmount = parseFloat(amount)
  const sender = User.getUserByEmail(senderEmail)
  console.log('sender', sender)
  console.log('sender.balance', sender.balance)

  if (sender.balance < transactionAmount) {
    console.log('not enough funds')
    return res.status(409).json({
      error: 'You do not have enough funds on this acount',
    })
  }

  try {
    TransactionHandler.processTransaction(
      senderEmail,
      reciverEmail,
      transactionAmount,
    )
    console.log('TRANSACTED')

    res.status(201).json({
      message: `${amount} has sent to ${reciverEmail}`,
      // user: {
      //   isLogged: user.isLogged,
      //   isConfirmed: user.isConfirmed,
      //   email: user.email,
      //   token: user.token,
      // },
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
