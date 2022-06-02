const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', async (req, res) => {
  const payload = req.body
  console.log('payload ', payload)
  try {
    const foundUser = await User.findByEmail(data)
    res.send(foundUser)
  } catch (err) {
    res.status(404).send({ error: err })
  }
})

router.post('/', async (req, res) => {})

module.exports = router
