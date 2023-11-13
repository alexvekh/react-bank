// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const User = require('../class/user')

router.post('/', (req, res) => {
  console.log('req.body', req.body)
  const { email } = req.body
  console.log('email: ', email)

  if (!email) {
    // Check if email or password are missing
    console.log('!email')
    return res
      .status(400)
      .json({ error: 'Email is required' })
  } else {
    console.log(' email OK ')

    const user = User.getUserByEmail(email)
    console.log(user)

    if (!user) {
      // Check if a user with the same email already exists
      console.log(
        'error: A user with this email is not registered',
      )
      return res.status(409).json({
        error: 'A user with this email is not registered',
      })
    } else {
      console.log(user)
      user.code = Math.floor(1000 + Math.random() * 9000)
      console.log('Recovery code', user.code)
      res.status(201).json({
        message: `The code for ${email} was sent`,
        // user: {
        //   isLogged: user.isLogged,
        //   token: user.token,
        //   email: user.email,
        // },
      })
    }
  }
})

// Експортуємо глобальний роутер
module.exports = router
