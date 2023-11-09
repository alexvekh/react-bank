class Notification {
  constructor(message, type) {
    this.message = message
    this.type = 'Announcement' || 'Warning'
    this.time = new Date()
  }
}

// class Notifications {
//   constructor() {
//     this.notifications = []
//   }

//   // Add a notification to the list
//   addNotification(message, type = 'info') {
//     const notification = new Notification(message, type)
//     this.notifications.push(notification)
//   }

//   // Get all notifications
//   getAllNotifications() {
//     return this.notifications
//   }

//   // Clear all notifications
//   clearNotifications() {
//     this.notifications = []
//   }
// }

// // Example usage:
// const notificationManager = new Notifications()
// notificationManager.addNotification(
//   'Transaction successful',
//   'success',
// )
// notificationManager.addNotification(
//   'Insufficient balance',
//   'error',
// )

// const allNotifications =
//   notificationManager.getAllNotifications()
// console.log(allNotifications) // Output the notifications

// notificationManager.clearNotifications() // Clear all notifications

module.exports = Notification
