const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Routes Files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

app.use(passport.initialize());
require('./config/passport')(passport);
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db).then( () => {
    console.log("MongoDB connected");
}).catch(err => console.log(err));


app.get('/' , (req, res) => {
    res.send('Hello World')
})

// Routes
app.use('/api/users' , users);
app.use('/api/profiles' , profile);
app.use('/api/posts' , posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));