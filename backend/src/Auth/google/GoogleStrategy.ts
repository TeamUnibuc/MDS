import { OAuth2Strategy as OAuthGoogleStrategy } from 'passport-google-oauth'
import { env } from '../../config';
import { UsersModel } from '../../models/UsersModel';
import { computeUsername, obtainEmailAndUser } from '../utils';

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
        passReqToCallback: true,
        callbackURL: `${env.FRONTEND_BASE_URL}:${env.FRONTEND_PORT}/auth/google/smart-callback`,
    },
    async function (req, accessToken, refreshToken, profile, done) {
        const {user: user, email: email} = await obtainEmailAndUser(profile)

        if (!email) {
            const msg = `Email not found in profile data`
            console.log(msg)
            return done(null, false, {message: msg})
        }

        // nu exista un user cu email la noi in DB, 
        // cream unul dar doar punem obiectul in sesiune ca si logat (dpdv passport), 
        //    dar defapt userul nu este in DB
        if (!user) {
            const newUsername = await computeUsername(email)
            if (!newUsername) {
                const msg = `Unable to generate username`
                console.log(msg)
                return done(null, undefined, {message: msg})
            }

            const createdUserDoc = new UsersModel({
                Email: email,
                FirstName: profile.name?.givenName,  // Daca cumva nu da nimic aici, teapa....
                LastName: profile.name?.familyName,
                Username: newUsername,  // notice the empty username consideram 
                DateJoined: new Date(),
                Providers: {
                    googleID: profile.id,
                },
            })

            createdUserDoc.save()
                .then(resp => {
                    console.log(`Saved in DB user: ${resp.Email}`)
                    req.flash('success', 'Account Created')
                    return done(null, createdUserDoc)
                })
                .catch(err => {
                    console.log(`Error saving in DB user: ${email}`, err)
                    return done(null, false, {message: 'Save in DB of shallow user failed'})
                })
            return ;
        }

        // User-ul exista, verificam daca trebuie sa adaugam provider-ul
        if (!user.Providers.googleID) {
            user.Providers.googleID = profile.id;
            await user.save()
        }

        req.flash('success', 'Logged In')
        // Yay
        return done(null, user)
    }
);
