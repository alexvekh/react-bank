//import Notification from './notification'
const Transaction = require('./transaction')

class User {
  static users = []

  constructor(email, password) {
    this.id = User.users.length + 1
    this.email = email
    this.password = password
    this.token = this.generateRandomToken(12)
    this.code = Math.floor(1000 + Math.random() * 9000)
    this.isConfirmed = false
    this.isLogged = false

    this.balance = 0
    this.transactions = []
    this.notifications = []

    User.users.push(this) // Add the new user to the users array
  }

  generateRandomToken(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let token = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      )
      token += characters.charAt(randomIndex)
    }
    return token
  }

  static getUserByEmail(email) {
    return User.users.find((user) => user.email === email)
  }

  getUserTransactionById(id) {
    return this.transactions.find(
      (transaction) => transaction.id === id,
    )
  }

  static existingUser = (email) =>
    User.getUserByEmail(email)
}

module.exports = User
