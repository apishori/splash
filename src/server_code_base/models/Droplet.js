const mongoose = require('mongoose');
const db_address = 'mongodb+srv://admin:abc123!@cluster0-gsdee.gcp.mongodb.net/test?retryWrites=true&w=majority';
let options = {
    useUnifiedTopology : true,
    useNewUrlParser: true
}; //params for mongo connection

//Connect to our mongodb database
mongoose.connect(db_address, options);
//console.log('Connected to database!');

//Droplet schema structure
const DropletSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Exports droplet model
module.exports = mongoose.model('Droplet', DropletSchema);