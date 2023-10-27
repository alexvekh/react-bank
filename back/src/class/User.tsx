class User {
  id: number
  email: string
  password: string
  token: string

  private static users: User[] = []

  constructor(email: string, password: string) {
    this.id = User.users.length + 1
    this.email = email
    this.password = password
    this.token = this.generateRandomToken(12)

    User.users.push(this) // Add the new user to the users array
  }

  private generateRandomToken(length: number): string {
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

  static getUserByEmail(email: string): User | undefined {
    return User.users.find((user) => user.email === email)
  }

  static getUsers = User.users
}

const newUser = new User('email@dot.com', 'ssdd22@@')
console.log(newUser, User.getUsers)
