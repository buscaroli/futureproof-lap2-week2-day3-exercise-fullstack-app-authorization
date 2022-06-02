const { init } = require('../dbConfig')
const { ObjectId } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

class User {
  constructor({ name, email, password }) {
    this.id = uuidv4()
    this.name = name
    this.email = email
    this.password = password
    this.basket = []
  }

  static findByEmail() {
    return new Promise(async (resolve, reject) => {
      console.log('data ', data)
      try {
        const db = await init()
        const foundUser = await db
          .collection('users')
          .find({ email: data.email })
          .toArray()
        console.log('foundUser -> ', foundUser)
        const user = new User({
          name: foundUser.name,
          email: foundUser.email,
          password: foundUser.password,
        })
        resolve(user)
      } catch (err) {
        reject(`Error fetching user: ${err}`)
      }
    })
  }
}

module.exports = User
