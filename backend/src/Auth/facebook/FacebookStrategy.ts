import { Strategy as OAuthFacebookStrategy, Profile } from 'passport-facebook'
import { env } from '../../config';
import { UsersDoc, UsersModel } from '../../models/UsersModel'

//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and
//   profile), and invoke a callback with a user object.


// Login/Registration Strategies return the MongoDB representation of user profiles
// Login just tries to return the user if it's already in DB
// Registration tries to create user if everything is alright

const FacebookOptions = {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
};

export const FacebookScopes = ['email', 'public_profile']


export const LoginFacebookStrategy = new OAuthFacebookStrategy(
    {
        ...FacebookOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/facebook/login-callback`,
        profileFields: [
            "id",
            "name",
            "name_format",
            "picture",
            "short_name",
            "email",
        ],
    },
    async function (accessToken, refreshToken, profile, done) {
        const {user: user} = await obtainEmailAndUser(profile)

        if (!user) // nu exista un user cu email la noi in DB
            return done(null, false, {message: "User with specified email doeesn't exists"})
        
        // Adauga ID pentru acest provider daca nu s-a mai logat pana acum
        if (!user.Providers.facebookID) {
            user.Providers.facebookID = profile.id;
            await user.save()
        }

        // Yay
        return done(null, user)
    }
);

export const RegisterFacebookStrategy = new OAuthFacebookStrategy(
    {
        ...FacebookOptions,
        callbackURL: `${env.BASE_URL}:${env.PORT}/facebook/register-callback`,
        profileFields: [
            "id",
            "name",
            "name_format",
            "picture",
            "short_name",
            "email",
        ],
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log(profile)
        const {user: user, email: email} = await obtainEmailAndUser(profile)
        
        if (user) {
            // User already exists
            const msg = `User already exists with email: ${user.Email}`
            console.log(msg)
            return done(null, false, {message: msg})
        }

        UsersModel.create({
            Email: email,
            FirstName: profile.name?.givenName,  // Daca cumva nu da nimic aici, teapa....
            LastName: profile.name?.familyName,
            Username: email,
            DateJoined: new Date(),
            Providers: {
                facebookID: profile.id,
            },
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

/**
 * Tries to extract email from the profile data
 * If successful, tries to query our MongoDB for our version of user 
 * @param profile Profile data given by the social network provider
 * @returns Email and User account as in our Database, if data is not bad
 */
const obtainEmailAndUser = async (profile: Profile):
    Promise<{
        email?: string,
        user?: UsersDoc
    }> => 
{
    console.log("Email data: ")
    console.log(profile.emails)
    const first_email_data = profile.emails?.[0]

    if (first_email_data === undefined)
        return {}
    const email = first_email_data.value

    const user = await UsersModel.findByEmail(email)
        .catch(reason => {
            console.log('Error finding by email: ', reason)
            return null;
        });
    console.log("User from promise: ", user)

    return {
        email: email,
        user: user || undefined,  // Mega funny, practic daca user este null, atunci pun undefined, 
    }                            // sa vrea argumentul optional :) ca asa vrea TS
}
