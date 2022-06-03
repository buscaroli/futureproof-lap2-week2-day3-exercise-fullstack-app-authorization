const db = connect('mongodb://localhost:27017/shopping')

db.users.drop()

db.users.insertMany([
  { name: 'Matt', email: 'matt@email.com', password: 'mattpw' },
  { name: 'Mel', email: 'mel@email.com', password: 'melpw' },
  { name: 'Susan', email: 'susan@email.com', password: 'susanpw' },
  { name: 'Amanda', email: 'amanda@email.com', password: 'amandapw' },
])
