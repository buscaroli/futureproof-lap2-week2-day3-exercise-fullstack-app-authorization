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
}
