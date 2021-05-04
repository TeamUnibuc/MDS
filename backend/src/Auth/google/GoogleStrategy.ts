import { OAuth2Strategy as OAuthGoogleStrategy } from 'passport-google-oauth'
import { env } from '../../config';
import { UsersModel } from '../../models/UsersModel';
import { createUserAndCallDone, obtainEmailAndUser } from '../utils';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.


// Login/Registration Strategies return the MongoDB representation of user profiles
// Login just tries to return the user if it's already in DB
// Registration tries to create user if everything is alright

const GoogleOptions = {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
};

export const GoogleScopes = ['profile', 'email']

export const SmartGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/google/smart-callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user, email: email} = await obtainEmailAndUser(profile)

        // nu exista un user cu email la noi in DB, cream unul...
        if (!user) {
            return createUserAndCallDone(email, profile, {googleID: profile.id}, done, "")
            // Deoarece username-ul va fi setat cu "", vom fi redirectati sa cream un username
        }

        // User-ul exista, verificam daca trebuie sa adaugam provider-ul
        if (!user.Providers.googleID) {
            user.Providers.googleID = profile.id;
            await user.save()
        }

        // Yay
        return done(null, user)
    }
);

export const LoginGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/google/login-callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user} = await obtainEmailAndUser(profile)

        if (!user) // nu exista un user cu email la noi in DB
            return done(null, false, {message: "User with specified email doeesn't exists"})
        
        if (!user.Providers.googleID) {
            user.Providers.googleID = profile.id;
            await user.save()
        }

        // Yay
        return done(null, user)
    }
);

export const RegisterGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/google/register-callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user, email: email} = await obtainEmailAndUser(profile)
        
        if (user) {
            // User already exists
            const msg = `User already exists with email: ${user.Email}`
            console.log(msg)
            return done(null, false, {message: msg})
        }

        createUserAndCallDone(email, profile, {googleID: profile.id}, done)
    }
);
