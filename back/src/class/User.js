class User {
  static users = []

  constructor(email, password) {
    this.id = User.users.length + 1
    this.email = email
    this.password = password
    this.token = this.generateRandomToken(12)
    this.isLogged = false
    this.isConfirmed = false

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

const newUser = new User('email@example.com', 'password123')
const allUsers = User.users
const existingUser = (email) => User.getUserByEmail(email)
console.log('New User:', newUser)
console.log('All Users:', allUsers)
console.log('Existing User:', existingUser)
console.log('ee', existingUser('email@example.com'))

module.exports = User
