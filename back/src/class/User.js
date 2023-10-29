class User {
  constructor(email, password) {
    this.id = User.users.length + 1
    this.email = email
    this.password = password
    this.token = this.generateRandomToken(12)

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
}

// Initialize the users array
User.users = []

// Create a new user
const newUser = new User('email@example.com', 'password123')

// Retrieve all users
const allUsers = User.users

// Retrieve a user by email
const existingUser = (email) => User.getUserByEmail(email)

console.log('New User:', newUser)
console.log('All Users:', allUsers)
console.log('Existing User:', existingUser)
console.log(existingUser('email@example.com'))
