// Підключаємо роутер до бек-енду

const User = require('../class/user')
const TransactionHandler = require('../class/transactionHandler')
const Notification = require('../class/notification')

//  ===========
function TestData() {
  const nick = new User('test1@mail.com', 'Password@1')
  console.log('Created user:', nick)

  const bob = new User('email@example.com', 'pasSw@rd123')
  console.log('Created user:', bob)

  bob.balance = 1222.35
  console.log('Credit bob $1222.35')

  bob.notifications.push(
    new Notification('New reward system', 'Announcement'),
  )
  bob.notifications.push(
    new Notification('New login', 'Warning'),
  )
  bob.notifications.push(
    new Notification('New reward system', 'Announcement'),
  )
  bob.notifications.push(
    new Notification('New login', 'Warning'),
  )
  console.log(bob.notifications)

  //

  try {
    TransactionHandler.processTransaction(
      'email@example.com',
      'test1@mail.com',
      11.05,
    )

    TransactionHandler.processTransaction(
      'email@example.com',
      'test1@mail.com',
      22,
    )

    TransactionHandler.processTransaction(
      'email@example.com',
      'test1@mail.com',
      33.1,
    )
  } catch (error) {
    console.error(error)
  }

  console.log('Created 3 transactions')
  console.log(User.users)
}
// Експортуємо глобальний роутер
module.exports = TestData()
