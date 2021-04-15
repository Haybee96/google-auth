const express = require('express');
const passport = require('passport');
const googleStrategy = require('./config/googleStrategy');

// Start express
const app = express();

app.use(googleStrategy);
app.use(passport.initialize());

// Authenticate with google
app.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
    console.log('Processing authentication');
});

app.get('/callback', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
    return res.send('You are authenticated');
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));