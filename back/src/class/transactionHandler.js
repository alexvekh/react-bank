const User = require('./user')
const Transaction = require('./transaction')

class TransactionHandler {
  static processTransaction(
    senderEmail,
    receiverEmail,
    amount,
  ) {
    const senderUser = User.getUserByEmail(senderEmail)
    const receiverUser = User.getUserByEmail(receiverEmail)

    if (senderUser && receiverUser) {
      if (senderUser.balance >= amount) {
        console.log(
          'balances',
          senderUser.balance,
          receiverUser.balance,
        )
        new Transaction(senderEmail, receiverEmail, amount)
        console.log(
          'Transaction.transactions: ',
          Transaction.transactions,
        )
        senderUser.balance -= amount
        senderUser.transactions.push({
          id: senderUser.transactions.length + 1,
          correspondent: receiverEmail,
          tymestamp: new Date(),
          type: 'Sending',
          amount: -amount,
        })
        console.log(
          'senderUser.transactions: ',
          senderUser.transactions,
        )
        receiverUser.balance += amount
        receiverUser.transactions.push({
          id: receiverUser.transactions.length + 1,
          correspondent: senderEmail,
          tymestamp: new Date(),
          type: 'Receipt',
          amount,
        })
        console.log(
          'receiverUser.transactions: ',
          receiverUser.transactions,
        )
        // Create and push transaction objects here

        console.log(
          'balances',
          senderUser.balance,
          receiverUser.balance,
        )
      } else {
        throw new Error('Insufficient balance')
      }
    } else {
      throw new Error(
        'Sender or receiver account not found',
      )
    }
  }
}

module.exports = TransactionHandler
