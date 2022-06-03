const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.TOKEN_PW)
    req.userCredentials = decodedToken
    next()
  } catch {
    throw new Error('Failed Authentication')
  }
}

module.exports = auth
