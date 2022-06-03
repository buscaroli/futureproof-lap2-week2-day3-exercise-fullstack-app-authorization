const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/:email', async (req, res) => {
  const payload = req.params.email
  console.log('payload ', payload)
  try {
    const foundUser = await User.findByEmail(payload)
    res.send(foundUser)
  } catch (err) {
    res.status(404).send({ error: err })
  }
})

router.post('/register', async (req, res) => {
  const payload = req.body
  console.log('body', req.body)
  try {
    const addedUser = await User.create(payload)
    res.status(201).send(addedUser)
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

module.exports = router
