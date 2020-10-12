const express = require('express'); // importing the express library - makes HTTP handling easier
const body_parser = require('body-parser'); //Parses HTTP requests
const cors = require('cors'); //Allows client to talk to frontend
const server = express(); // creating a server instance called "server"

//Enable packages in the server
server.use(cors());
server.use(body_parser.urlencoded( {extended : true} ));
server.use(express.json());
server.use(express.static('./dist'));

// port that our server will be listening on
const port = process.env.PORT || 80;

//Import models for User, Droplet & Comment
let User = require('./models/User');
let Droplet =  require('./models/Droplet');
let Comment = require('./models/Comment');

// Create a new droplet and add it to the database
server.post('/droplet', async (req,res) => {
    try {
        //check if user is logged in
        if(req.body.user_id == null) res.status(400).send();

        //build droplet
        let droplet = new Droplet({
            text: req.body.text,
            user_id: req.body.user_id,
            img_url: req.body.img_url
        });

        //save droplet
        droplet.save(function(err) {
            if (!err) {
                Droplet.findOne( {_id : droplet._id} ).populate('user_id')
                    .exec(function(error, drop) {
                        res.status(200).send(drop);
                    });
            }
        });
    } catch(err) {
        console.log(err.stack);
        res.status(400).send("Error creating a new droplet");
    }
});

// Check database for user credentials, log user into website if they exist
server.post('/login', async (req, res) => {
    try {
        console.log("Logging in...");

        if(req.body.username == null){
            res.status(400).send("No Username given...")
        }

        if(req.body.password == null){
            res.status(400).send("No Password given...")
        }

        //find user in db
        let user = await User.findOne({
            username: req.body.username,
            password:req.body.password
        });

        //validate user
        if (user) {
            console.log("Found user in database!");
        } else {
            console.log("Could not find user in database...");
            throw new Error('No user with those credentials...');
        }

        res.status(200).send(user);
    } catch(err) {
        console.log(err.stack);
        res.status(400).send("[Invalid login] -> credentials do not match known user")
    }
});

// Get all droplets from the database
server.get('/wateringhole', async (req, res) => {
    try {
        let droplets = await Droplet.find({}).populate("user_id");
        res.status(200).send(droplets);
    } catch (err) {
        console.log(err.stack);
        res.status(400).send("Encounter issue getting droplets for Watering Hole...");
    }
});

// Create user and add them to the database
server.post('/registration', async (req, res) => {
    try {
        //Check if info was entered
        let field_error = false;
        if (req.body.username.isEmpty) {
            res.append('usernameError', 'Please enter a username');
            field_error = true;
        }
        if (req.body.password.isEmpty) {
            res.append('passwordError', 'Please enter a password');
            field_error = true;
        }
        if (req.body.email.isEmpty) {
            res.append('emailError', 'Please enter an email');
            field_error = true;
        }
        if (req.body.fname.isEmpty) {
            res.append('firstNameError', 'Please enter a first name');
            field_error = true;
        }
        if (req.body.lname.isEmpty) {
            res.append('lastNameError', 'Please enter a last name');
            field_error = true;
        }

        // check if there is a field_error
        if (field_error) {
            throw new Error("Field error...");
        }
        //check if user already exists
        await User.find({ username: req.body.username});

        //create new user
        let new_user = new User({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            fname : req.body.fname,
            lname : req.body.lname
        });

        new_user = await new_user.save();
        res.status(200).send(new_user);
    } catch (err) {
        console.log(err.stack);
        res.status(400).send("[Invalid registration] -> field error(s)...");
    }
});

//Retrieve user profile info
server.post('/profile', async (req, res) => {
    try {
        //check if user is logged in
        if(req.body.user_id == null) res.status(400).send();

        //Get user data
        let user = await User.findOne({ _id: req.body.user_id});
        //Get droplets posted
        let droplets = await Droplet.find( {user_id : user._id} ).populate("user_id");
        let response = {
            user_object : user,
            droplet_objects : droplets
        };

        res.status(200).send(response);
    } catch(err) {
        console.log(err.stack);
        res.status(400).send("[Profile Error] -> Encountered issue while retrieving profile info...")
    }
});

//Gets daily splash content
server.get('/dailysplash', async (req, res) => {
    //establishes network connection with java server
    let net = require('net');
    function getWeather() {
        return new Promise(function (resolve, reject) {
            let client = net.connect(6789, 'localhost');
            client.setEncoding('utf8');
            client.on('data', function (data) {
                client.end();
                resolve(data);
            });
            client.on('error', function (err) {
                reject(err);
            });
        });
    }
    function getMeme() {
        let memes = ["https://pbs.twimg.com/media/Dlb-mxlU0AE9_sA.jpg", "https://i.pinimg.com/736x/fd/45/e1/fd45e1fde76b97b84ef8ef5273f79de6.jpg",
            "https://pbs.twimg.com/media/D5_qkk0UwAACg4V.jpg", "https://i.pinimg.com/originals/8c/94/ec/8c94ec39b195062704760144d455f6b4.png",
            "https://i.pinimg.com/originals/e0/dd/3b/e0dd3bf212283a91a392972aa59caf9c.jpg",
            "https://preview.redd.it/ra4ci3mvw6v41.png?width=640&crop=smart&auto=webp&s=d2600ba893537a5b84490c783a67c4c6ef1c0ad0",
            "https://pbs.twimg.com/media/Cpwoac3UMAAd3Ax.jpg", "https://preview.redd.it/65n9r95e46v41.jpg?width=640&crop=smart&auto=webp&s=f792cd1aad50d4d23ba9db890ac4c680deb11119",
            "https://preview.redd.it/ig5u8ke5qo421.png?width=640&crop=smart&auto=webp&s=33134982ecc0149d7895808ee6ecca1413ef1a61", "https://i.imgflip.com/3yabaw.jpg", "https://i.imgflip.com/3yabwr.jpg",
            "https://i.imgflip.com/3yac1u.jpg", "https://i.imgflip.com/3yacbr.jpg"];
        let x = Math.floor(Math.random() * Math.floor(memes.length));
        return memes[x];
    }

    try {
        let response = {
            weather_overview : null,
            weather_details : null,
            droplet : null,
            meme: null
        };

        //Get random meme
        let url = getMeme();
        response.meme = url;

        //Gets most recent daily droplet
        let daily_droplet = await Droplet.findOne().populate("user_id");

        if (daily_droplet == null) {
            response.droplet = 'NA';
        } else {
            response.droplet = daily_droplet;
        }

        //gets the daily weather info
        getWeather().then(async function(value){

            if (value == null) {
                response.weather_overview = 'NA';
                response.weather_details = 'NA';
            } else {
                response.weather_overview = JSON.parse(value);
                let weather_details_array = response.weather_overview.weather;
                response.weather_details = weather_details_array[0];
            }

            res.status(200).send(response);
        });
    } catch (err) {
        console.log(err.stack);
        res.status(400).send("[Daily Splash Error] -> Encountered issue making Weather API call");
    }
});

//RESETS DB, ONLY FOR ADMIN USE
server.get('/reset', async (req, res) => {
    try {
        //let a = await User.remove({});
        let b = await Droplet.remove({});
        let c = await Comment.remove({});

        console.log("Removed " + b.deletedCount + " Droplet records, " + c.deletedCount + " Comment records");
        res.status(200).send("Db reset")
    } catch(err){
        console.log(err.stack);
        res.status(400).send("Could not reset db")
    }
});

server.listen(port, () => console.log(`Example app listening at http://127.0.0.1`));
