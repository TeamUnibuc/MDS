import { OAuth2Strategy as OAuthGoogleStrategy, Profile, VerifyFunction } from 'passport-google-oauth'
import { env } from '../../config';
import { UsersDoc, UsersModel } from '../../models/UsersModel'

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.


// Login/Registration Strategies return the MongoDB representation of user profiles
// Login just tries to return the user if it's already in DB
// Registration tries to create user if everything is alright

const GoogleOptions = {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET
};

export const GoogleScopes = ['profile', 'email']


export const LoginGoogleStrategy = new OAuthGoogleStrategy(
    {
        ...GoogleOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/auth/google-callback`
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user} = await obtainEmailAndUser(profile)

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
        const {user: user, email: email} = await obtainEmailAndUser(profile)
        
        if (user) {
            // User already exists
            const msg = `User already exists with email: ${user.Email}`
            console.log(msg)
            return done(null, false, {message: msg})
        }
        
        UsersModel.create({
            Email: email,
            FirstName: profile.name?.givenName,  // Daca cumva google nu da nimic aici, teapa....
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


const obtainEmailAndUser = async (profile: Profile):
    Promise<{
        email?: string,
        user?: UsersDoc
    }> => 
{
    console.log("First email data: ")
    const email_data = profile.emails?.[0]
    console.log(email_data)

    if (email_data === undefined)
        return {}
    const email = email_data.value

    const user = await UsersModel.findByEmail(email)
        .catch(reason => {
            console.log('Error finding by email: ', reason)
            return null;
        });
    console.log("User from promise: ", user)

    return {
        email: email,
        user: user || undefined  // Mega funny, practic daca user este null, atunci pun undefined, 
    }                            // sa vrea argumentul optional :) ca asa vrea TS
}
