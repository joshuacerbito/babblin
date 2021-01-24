import { EnvConfig } from './typedefs';
import express = require('express');

module.exports = (app: express.Application, env: EnvConfig) => {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = env;

  const passport = require('passport');
  const session = require('express-session');
  const GitHubStrategy = require('passport-github2').Strategy;

  const GITHUB_CALLBACK_URL = 'https://localhost:5000/auth/github/callback'; // or get from process.env.GITHUB_CALLBACK_URL

  function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
      },
      function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        console.log({ accessToken, refreshToken, profile });

        // An example of how we might save a user
        // new User({ username: profile.username }).fetch().then(user => {
        //   if (!user) {
        //     user = User.forge({ username: profile.username })
        //   }
        //
        //   user.save({ profile: profile, access_token: accessToken }).then(() => {
        //     return done(null, user)
        //   })
        // })
      }
    )
  );

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.send("<a href='/secret'>Access Secret Area</a>");
  });

  app.get('/login', (req, res) => {
    res.send("<a href='/auth/github'>Sign in With GitHub</a>");
  });

  app.get('/secret', ensureAuthenticated, (req: any, res) => {
    res.send(`<h2>yo ${req.user}</h2>`);
  });

  app.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['repo:status'] // Note the scope here
    }),
    function (req, res) {}
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }),
    function (req, res) {
      res.redirect('/');
    }
  );
};
