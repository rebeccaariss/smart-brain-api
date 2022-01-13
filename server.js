const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized : false
        }
    }
    // connection: {
    //     // host : '127.0.0.1', // (localhost)
    //     host : 'agile-plateau-47799',
    //     port : process.env.PORT,
    //     user : '',
    //     password : '',
    //     database : 'postgresql-fitted-80755'
    // }
});

// test db connection in console itself:
// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

// app.use calls for middleware:
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users); // this will no longer work now that we have deleted the hard-coded "database" variable
})

app.post('/signin', signin.handleSignIn(db, bcrypt)) // See "Code Review" video from deployment section of course for more on this particular syntax
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
})

// API Endpoint Planning Notes: Absolute Basics
// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user
