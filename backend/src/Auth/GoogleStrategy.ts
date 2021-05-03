import { OAuth2Strategy as OAuthGoogleStrategy, Profile, VerifyFunction } from 'passport-google-oauth'
import { env } from '../config';
import { UsersDoc, UsersModel } from '../models/UsersModel'

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.


// Login Strategies return the MongoDB representation of user profiles
// Register Strategeies return the Profiles for the specific provider
//   and try to create a new MongoDB entry for the user

const GoogleOptions = {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET
};

// const obtainEmailAndProcess = async (profile: Profile, done: VerifyFunction) => 
// {
//     console.log("First email data: ")
//     const email_data = profile.emails?.[0]
//     console.log(email_data)

//     if (email_data === undefined) {
//         done(null, false, { message: "Google profile doesn't have a single email adress" });
//         return null;
//     }
//     const email = email_data.value

//     const user = await UsersModel.findByEmail(email)
//         .catch(() => null);
//     console.log("User from promise: ", user)

//     return user
// }

export const LoginGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/auth/google-callback`
    },
    
    async function (accessToken, refreshToken, profile, done) {
        console.log("First email data: ")
        const email_data = profile.emails?.[0]
        console.log(email_data)

        if (email_data === undefined)
            return done(null, false, { message: "Google profile doesn't have a single email adress" });
        const email = email_data.value

        const user = await UsersModel.findByEmail(email)
            .catch(reason => {
                console.log('Error finding by email: ', reason)
                return null;
            });
        console.log("User from promise: ", user)
        if (!user) // nu exista un user cu email la noi in DB
            return done(null, false, {message: "User with specified email doeesn't exists"})
        
        // Yay
        return done(null, user)
    }
);

export const RegisterGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/auth/register/google-callback`
    },
    
    async function (accessToken, refreshToken, profile, done) {
        console.log("First email data: ")
        const email_data = profile.emails?.[0]
        console.log(email_data)

        if (email_data === undefined) {
            const msg = "Google profile doesn't have a single email adress"
            return done(null, false, {message: msg});
        }
        const email = email_data.value

        const user = await UsersModel.findByEmail(email)
            .catch(reason => {
                console.log('Error finding by email: ', reason)
                return null;
            });
        console.log("User from promise: ", user)
        
        if (user) {
            // User already exists
            const msg = `User already exists with email: ${user.Email}`
            console.log(msg)
            return done(null, false, {message: msg})
        }
        
        UsersModel.create({
            Email: email,
            FirstName: profile.name?.givenName,
            LastName: profile.name?.familyName,
            Username: email,
            DateJoined: new Date(),
            Providers: {
                googleID: profile.id
            }
        }).then(userDoc => {
            console.log(`DB user created!`)
            done(null, userDoc, {message: "User created successfully"})
        }).catch(err => {
            const msg = `Error creating user in DB: ${err}`
            console.log(msg)
            done({err: msg}, false, {message: msg})
        })
    }
);

export const GoogleScopes = ['profile', 'email']
