// db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://umamahesh9447230:kazuto14@cluster0.eoieac4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB Connection Error: ', err));

module.exports = mongoose;
