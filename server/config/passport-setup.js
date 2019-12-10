import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import keys from "./key";
import User from "../models/User";

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new googleStrategy(
    {
      //options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      console.log("passport callback function fired");
      console.log(profile);
      new User({
        name: profile.displayName,
        id: profile.id
      })
        .save()
        .then(newUser => {
          console.log(`new user created : ${newUser}`);
          done(null, newUser);
        });
    }
  )
);
