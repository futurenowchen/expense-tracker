const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash("warning_msg", "這個 email 已經被註冊過了！"))
        }
        return bcrypt.compare(password, user.password).then((isMatched) => {
          if (!isMatched) {
            return done(null, false, req.flash("warning_msg", "Email 或 Password 錯誤！"))
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}