//import Notification from './notification'
//import Transaction from './transaction'

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
  static existingUser = (email) =>
    User.getUserByEmail(email)
}
// Test user
console.log('Test User')
const user1 = new User('test1@mail.com', 'Password@1')
console.log('Created user:', user1)
const user2 = new User('email@example.com', 'pasSw@rd123')
console.log('Created user:', user2)
user1.balance = 1000
console.log('Credit user1 $1000')

// const transaction = new Transaction(
//   'test1@mail.com',
//   'email@example.com',
//   100,
// )

//const transaction1 = new Transaction('email@example.com', 'test@mail.com', 200);
//const transaction2 = new Transaction('test@mail.com', 'email@example.com', 120;)

//const allUsers = User.users
//const existingUser = (email) => User.getUserByEmail(email)

//console.log('All Users:', allUsers)
//console.log('Existing User:', existingUser)
//console.log('ee', existingUser('email@example.com'))

module.exports = User
