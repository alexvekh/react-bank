import { getUserByEmail } from './user'
//import User from './user'

class Transaction {
  constructor(id, senderEmail, receiverEmail, amount) {
    this.id = this.timestamp.getTime().toString()
    this.timestamp = new Date()
    this.senderEmail = senderEmail
    this.receiverEmail = receiverEmail
    this.amount = amount
  }

  // Method to process the transaction
  processTransaction(senderEmail, receiverEmail, amount) {
    // Add your logic to process the transaction here
    // For example, deduct the amount from the sender and add it to the receiverEmail
    // This is a simplified example; in a real application, you'd interact with a database or blockchain
    // Deduct the amount from the senderEmail

    const senderUser = this.getUser(this.senderEmail)
    if (senderUser) {
      if (senderUser.balance >= this.amount) {
        senderUser.balance -= this.amount
      } else {
        throw new Error('Insufficient balance')
      }
    } else {
      throw new Error('Sender account not found')
    }

    //// Add the amount to the receiverEmail
    const receiverUser = this.getUser(this.receiverEmail)
    if (receiverUser) {
      receiverUser.balance += this.amount
    } else {
      throw new Error('Receiver account not found')
    }
  }

  // Method to get the account details (you'd replace this with actual account retrieval)
  getUser(email) {
    // Simulated account retrieval from a database or storage
    User.getUserByEmail(email)
    // const accounts = {
    //   alice: { balance: 1000 },
    //   bob: { balance: 500 },
    // }
    return User
  }
}

// Example usage:
console.log('Test Tansactions')
const transaction = new Transaction(
  'test1@mail.com',
  'email@example.com',
  100,
)
console.log(
  'created new Transaction $100',
  user1.balance,
  user2.balance,
)

try {
  transaction.processTransaction()
  console.log('Transaction successful')
} catch (error) {
  console.error(`Transaction failed: ${error.message}`)
}

module.exports = Transaction
