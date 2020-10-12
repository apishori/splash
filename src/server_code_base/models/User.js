const mongoose = require('mongoose');
const db_address = 'mongodb+srv://admin:abc123!@cluster0-gsdee.gcp.mongodb.net/test?retryWrites=true&w=majority';
let options = {
    useUnifiedTopology : true,
    useNewUrlParser: true
}; //params for mongo connection

//Connect to our mongodb database
mongoose.connect(db_address, options);
//console.log('Connected to database!');

//User schema structure
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    guest: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://pbs.twimg.com/media/EJJ9ecLUcAA44pd.png"
    }
}, {timestamps: true});

// liked_droplets: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'Droplet',
//     default: []
// },

//Exports User Model
module.exports = mongoose.model('User', UserSchema);