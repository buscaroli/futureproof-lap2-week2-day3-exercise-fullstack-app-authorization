const bcrypt = require('bcrypt')
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

  static findByEmail(email) {
    return new Promise(async (resolve, reject) => {
      console.log('email ', email)
      try {
        const db = await init()
        const foundUser = await db.collection('users').find({ email }).toArray()
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
          const saltRounds = 10
          bcrypt.hash(data.password, saltRounds, async function (err, hash) {
            if (err) {
              reject(err)
            } else {
              const newUserObj = await db.collection('users').insertOne({
                name: data.name,
                email: data.email,
                password: hash,
              })
              console.log('newUserObj ', newUserObj)
              const user = new User({
                ...data,
                id: newUserObj.insertedId,
              })
              console.log('user -> ', user)

              resolve({ id: user.id, name: user.name, email: user.email })
            }
          })
        }
      } catch {
        reject('Unable to save user.')
      }
    })
  }
}

module.exports = User
