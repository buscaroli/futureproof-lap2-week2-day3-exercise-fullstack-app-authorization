const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.get('/:email', async (req, res) => {
  const payload = req.params.email

  try {
    const foundUser = await User.findByEmail(payload)
    res.send(foundUser)
  } catch (err) {
    res.status(404).send({ error: err })
  }
})

router.post('/register', async (req, res) => {
  const payload = req.body

  try {
    const addedUser = await User.create(payload)
    res.status(201).send(addedUser)
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

router.delete('/', auth, async (req, res) => {
  const payload = req.body

  try {
    const deletedUser = await User.delete(payload)
    res.send(deletedUser)
  } catch (err) {
    res.status(406).send({ error: err })
  }
})

router.post('/login', async (req, res) => {
  const payload = req.body

  try {
    const token = await User.login(payload)
    res.send({ token })
  } catch (err) {
    res.status(401).send({ error: err })
  }
})

module.exports = router
