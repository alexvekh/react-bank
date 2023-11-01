// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const signupRoute = require('./signup')
const signinRoute = require('./signin')

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є
router.use('/signup', signupRoute)
router.use('/signin', signinRoute)

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
