const { init } = require('../dbConfig')
const { ObjectId } = require('mongodb')

class User {
  constructor({ id, name, email, password }) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.basket = []
  }

  static findByEmail(data) {
    return new Promise(async (resolve, reject) => {
      console.log('data ', data)
      try {
        const db = await init()
        const foundUser = await db
          .collection('users')
          .find({ email: data.email })
          .toArray()
        console.log('foundUser -> ', foundUser)
        const user = new User({ ...foundUser[0], id: foundUser[0]._id })
        resolve(user)
      } catch {
        reject(`User not found.`)
      }
    })
  }

  static create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init()
        const userExists = await db
          .collection('users')
          .countDocuments({ email: data.email })

        if (userExists) {
          reject('Email address not available.')
        } else {
          const newUserObj = await db.collection('users').insertOne({
            name: data.name,
            email: data.email,
            password: data.password,
          })
          console.log('newUserObj ', newUserObj)
          const user = new User({
            ...data,
            id: newUserObj.insertedId,
          })
          console.log('user -> ', user)

          resolve(user)
        }
      } catch {
        reject('Unable to save user.')
      }
    })
  }
}

module.exports = User
