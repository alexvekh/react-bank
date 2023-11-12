const User = require('../class/user')
const TransactionHandler = require('../class/transactionHandler')
const Notification = require('../class/notification')

//  creating users and transactions for testing

function TestData() {
  const nick = new User('nick@mail.com', 'Password@1')

  nick.notifications.push(
    new Notification('Created account', 'Announcement'),
  )

  const bob = new User('bob@mail.com', 'pasSw@rd123')

  bob.balance = 1222.35

  bob.notifications.push(
    new Notification('Created account', 'Announcement'),
  )

  bob.notifications.push(
    new Notification('New reward system', 'Announcement'),
  )

  bob.balance = 1222.35

  bob.notifications.push(
    new Notification('Deposited $122.35', 'Announcement'),
  )

  //

  try {
    TransactionHandler.processTransaction(
      'bob@mail.com',
      'nick@mail.com',
      11.05,
    )

    TransactionHandler.processTransaction(
      'bob@mail.com',
      'nick@mail.com',
      22,
    )

    TransactionHandler.processTransaction(
      'bob@mail.com',
      'nick@mail.com',
      33.1,
    )
  } catch (error) {
    console.error(error)
  }

  console.log(User.users)
}
// Експортуємо глобальний роутер
module.exports = TestData()
