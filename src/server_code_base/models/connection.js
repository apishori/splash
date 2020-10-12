const mongoose = require('mongoose');
const db_address = 'mongodb+srv://admin:abc123!@cluster0-gsdee.gcp.mongodb.net/test?retryWrites=true&w=majority';
let options = {
    useUnifiedTopology : true,
    useNewUrlParser: true
}; //params for mongo connection

//Connect to our mongodb database
mongoose.connect(db_address, options);
console.log('Connected to database!');

module.exports = mongoose;