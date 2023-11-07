const User = require('./user')

class Transaction {
  static transactions = []

  constructor(senderEmail, receiverEmail, amount) {
    this.id = Transaction.transactions.length + 1
    this.timestamp = new Date()
    this.senderEmail = senderEmail
    this.receiverEmail = receiverEmail
    this.amount = amount

    Transaction.transactions.push(this)
  }
}

module.exports = Transaction
