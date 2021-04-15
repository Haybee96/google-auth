const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config/config');

// Start express
const app = express();

// app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

let userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

passport.use(new GoogleStrategy({
    clientID: config.clientId,
    clientSecret: config.secret,
    callbackURL: "http://localhost:8888/callback"
  }, (accessToken, refreshToken, profile, done) => {
      userProfile = profile;
      console.log(userProfile);
      return done(null, userProfile);
  }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
  
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));
 
app.get('/', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/callback', passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
    res.redirect('/success');
});

// app.get('/', (req, res) => {
//     res.render('pages/auth');
// });

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));