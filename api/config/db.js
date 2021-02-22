const mongoose = require('mongoose')

const db =
  'mongodb+srv://induro:1234@indurotest.dujxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('--> MongoDB Connected.')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
module.exports = connectDB
