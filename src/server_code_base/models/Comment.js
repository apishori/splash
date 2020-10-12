const mongoose = require('mongoose');
const db_address = 'mongodb+srv://admin:abc123!@cluster0-gsdee.gcp.mongodb.net/test?retryWrites=true&w=majority';
let options = {
    useUnifiedTopology : true,
    useNewUrlParser: true
}; //params for mongo connection

//Connect to our mongodb database
mongoose.connect(db_address, options);
//console.log('Connected to database!');

//Comment schema structure
const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
       type: Date,
       default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);