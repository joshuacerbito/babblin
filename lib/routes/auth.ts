import { TypeEnv } from '../typedefs';
import { PassportStatic, Profile } from 'passport';
import { Application, Request, Response } from 'express';

const passport: PassportStatic = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

module.exports = (app: Application, env: TypeEnv) => {
  /**
   *  GITHUB OAuth Routes
   */
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = env;
  const GITHUB_CALLBACK_URL: string = 'https://localhost:5000/auth/github/callback'; // or get from process.env.GITHUB_CALLBACK_URL

  const ensureAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  };

  passport.serializeUser(function (user, done: Function) {
    done(null, user);
  });

  passport.deserializeUser(function (obj: any, done: Function) {
    done(null, obj);
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
      },
      function (accessToken: string, refreshToken: string, profile: Profile, done) {
        // asynchronous verification, for effect...
        // console.log({ accessToken, refreshToken, profile });

        // An example of how we might save a user
        // new User({ username: profile.username }).fetch().then(user => {
        //   if (!user) {
        //     user = User.forge({ username: profile.username });
        //   }

        //   user.save({ profile: profile, access_token: accessToken }).then(() => {
        //     return done(null, user);
        //   });
        // });

        done(null, {
          accessToken,
          profile
        });
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

  app.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['repo:status'] // Note the scope here
    }),
    function (req: Request, res: Response) {}
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }),
    function (req: Request, res: Response) {
      console.log('REDIRECTED');
      res.redirect('/secret');
    }
  );

  /**
   * Authenticated Routes
   */
  app.get('/secret', ensureAuthenticated, (req: any, res) => {
    console.log('REQ.USER', req.user);
    res.send('<h2>Secret Page, Put Chat function here.</h2>');
  });
};
