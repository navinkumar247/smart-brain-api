const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');

// SERVER
const app = express();

// DATABASE
const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
  });


// MIDDLEWARES

app.use(express.json());
app.use(cors());


// ENDPOINTS

app.get('/', (req, res) => res.json('server connected'))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {res.send('working')} );

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/image', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})