const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Routes Files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const db = require('./config/keys').mongoURI;
mongoose.connect(db).then( () => {
    console.log("database connected");
}).catch(err => console.log(err));

app.get('/' , (req, res) => {

})

// Routes
app.use('./api/users' , users);
app.use('./api/profiles' , profiles);
app.use('./api/users' , posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running"));