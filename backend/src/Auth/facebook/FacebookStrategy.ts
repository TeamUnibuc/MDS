import { env } from '../../config';
import { Strategy as OAuthFacebookStrategy } from 'passport-facebook'
import { obtainEmailAndUser } from '../utils';
import { UsersModel } from '../../models/UsersModel';

//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and
//   profile), and invoke a callback with a user object.


// Login/Registration Strategies return the MongoDB representation of user profiles
// Login just tries to return the user if it's already in DB
// Registration tries to create user if everything is alright


// These are the data fields you ask facebook to give you about the user
// IF you have the access. And that access is given by thee scopes you provide
const facebookProfileFields = [
    "id",
    "name",
    "name_format",
    "picture",
    "short_name",
    "email",
]

// When you do an Auth, what "scopes", or "hmm, id like something about <X>"
// They give you access to specific fields, like the ones above
export const FacebookScopes = ['email', 'public_profile']

const FacebookOptions = {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    profileFields: facebookProfileFields,
};

export const SmartFacebookStrategy = new OAuthFacebookStrategy(
    {
        ...FacebookOptions,
        callbackURL: `${env.BACKEND_BASE_URL}:${env.PORT}/auth/facebook/smart-callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user, email: email} = await obtainEmailAndUser(profile)

        if (!email) {
            const msg = `Email not found in profile data`
            console.log(msg)
            return done(null, false, {message: msg})
        }

        // nu exista un user cu email la noi in DB, 
        // cream unul dar doar punem obiectul in sesiune ca si logat (dpdv passport), 
        //    dar defapt userul nu are username
        if (!user) {
            const createdUserDoc = new UsersModel({
                Email: email,
                FirstName: profile.name?.givenName,  // Daca cumva nu da nimic aici, teapa....
                LastName: profile.name?.familyName,
                Username: undefined,  // notice the empty username consideram 
                DateJoined: new Date(),
                Providers: {
                    facebookID: profile.id,
                },
            })
            createdUserDoc.save()
                .then(resp => {
                    console.log(`Saved in DB Shallow user: ${resp.Email}`)
                    return done(null, createdUserDoc)
                })
                .catch(err => {
                    console.log(`Error saving in DB Shallow user: ${email}`, err)
                    return done(null, false, {message: 'Save in DB of shallow user failed'})
                })
            return ;
        }

        // User-ul este in baza de date, dar s-ar putea sa nu aiba username setat

        // User-ul exista, verificam daca trebuie sa adaugam provider-ul
        if (!user.Providers.facebookID) {
            user.Providers.facebookID = profile.id;
            await user.save()
        }

        // Yay
        return done(null, user)
    }
);
