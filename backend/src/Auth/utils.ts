import { Profile } from 'passport'
import { VerifyFunction } from 'passport-google-oauth'
import { UsersDoc, UsersItem, UsersModel } from '../models/UsersModel'

/**
 * Tries to create a user given its email, profile, provider and username information
 * @param email email from the social provider
 * @param profile profile from the social provider
 * @param provider Details for the provider field
 * @param done VerifyFunction for passport auth
 * @returns Nothing, it runs a promise and thats it
 */
 export const createUserAndCallDone = (email: string | undefined, profile: Profile, 
    provider: Partial<UsersItem['Providers']>, done: VerifyFunction, username = email): void =>
{
    if (!email) {
        const msg = `Email not found in profile data`
        console.log(msg)
        return done(null, false, {message: msg})
    }

    UsersModel.create({
        Email: email,
        FirstName: profile.name?.givenName,  // Daca cumva nu da nimic aici, teapa....
        LastName: profile.name?.familyName,
        Username: username,
        DateJoined: new Date(),
        Providers: provider,
    }).then(userDoc => {
        console.log(`DB user created!`)
        done(null, userDoc, {message: "User created successfully"})
    }).catch(err => {
        const msg = `Error creating user in DB: ${err}`
        console.log(msg)
        done({err: msg}, false, {message: msg})
    })
}

/**
 * Tries to extract email from the profile data
 * If successful, tries to query our MongoDB for our version of user 
 * @param profile Profile data given by the social network provider
 * @returns Email and User account as in our Database, if data is not bad
 */
export const obtainEmailAndUser = async (profile: Profile):
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
