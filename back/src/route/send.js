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
    return res.status(400).json({
      error: 'Email and transaction amount are required',
    })
  }

  if (senderEmail === reciverEmail) {
    return res.status(400).json({
      error:
        'Sorry, but no sense in transaction to youself',
    })
  }

  // if no user in the system
  if (!User.existingUser(reciverEmail)) {
    return res.status(409).json({
      error: `A user with email ${reciverEmail} not found`,
    })
  }

  // parse to Float
  const transactionAmount = parseFloat(amount)
  const sender = User.getUserByEmail(senderEmail)

  if (sender.balance < transactionAmount) {
    return res.status(409).json({
      error: 'Not enough funds on your acount',
    })
  }
  // make transaction
  try {
    TransactionHandler.processTransaction(
      senderEmail,
      reciverEmail,
      transactionAmount,
    )

    res.status(201).json({
      message: `${amount} has sent to ${reciverEmail}`,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
