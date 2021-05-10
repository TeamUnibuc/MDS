import { Strategy as OAuthGithubStrategy } from 'passport-github2'
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

const GithubOptions = {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
};

export const GithubScopes = [ 'read:user', 'user:email' ]

export const SmartGithubStrategy = new OAuthGithubStrategy(
    {
        ...GithubOptions,
        callbackURL: `${env.FRONTEND_BASE_URL}:${env.FRONTEND_PORT}/auth/github/smart-callback`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function (accessToken: string, refreshToken: string, profile: any, done: any) {
        console.log('github profile: ', profile)
        const {user: user, email: email} = await obtainEmailAndUser(profile)

        if (!email) {
            const msg = `Email not found in profile data`
            console.log(msg)
            return done(null, undefined, {message: msg})
        }

        const displayname = String(profile.displayname)
        let firstName = displayname.substr(0, displayname.indexOf(' ')); // "72"
        let lastName  = displayname.substr(displayname.indexOf(' ')+1); // "tocirah sneab"

        if (!firstName || !lastName) {
            firstName = String(profile.username)
            lastName = String(profile.username)
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
                FirstName: firstName,  // Daca cumva nu da nimic aici, teapa....
                LastName: lastName,
                Username: newUsername,  // notice the empty username consideram 
                DateJoined: new Date(),
                Providers: {
                    githubID: profile.id,
                },
            })

            createdUserDoc.save()
                .then(resp => {
                    console.log(`Saved in DB user: ${resp.Email}`)
                    return done(null, createdUserDoc)
                })
                .catch(err => {
                    console.log(`Error saving in DB  user: ${email}`, err)
                    return done(null, undefined, {message: 'Save in DB of shallow user failed'})
                })
            return ;
        }

        // User-ul este in baza de date, dar s-ar putea sa nu aiba username setat

        // User-ul exista, verificam daca trebuie sa adaugam provider-ul
        if (!user.Providers.githubID) {
            user.Providers.githubID = profile.id;
            await user.save()
        }

        // Yay
        return done(null, user)
    }
);
