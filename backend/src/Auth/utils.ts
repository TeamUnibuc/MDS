import { Profile } from 'passport'
import { UsersDoc, UsersModel } from '../models/UsersModel'

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

export const computeUsername = async (email: string): Promise<string | undefined> =>
{
    const aronPos = email.lastIndexOf('@')
    if (aronPos == -1) {
        return undefined
    }
    
    const userPrefix = email.substr(0, aronPos)

    return await generateUsername(userPrefix)    
}

export const generateUsername = async (prefix: string, lg = 0): Promise<string> =>
{
    const randomDig = () => String(Math.floor(Math.random() * 10))

    const nrTries = Math.pow(10, Math.max(0, lg - 1))
    let foundUsername: string | undefined;
    // eslint-disable-next-line no-loops/no-loops
    for (let nrTried = 0; nrTried < nrTries; ++nrTried) {
        const randomDigits = Array.from({length: lg}, () => randomDig()).join('')
        const candidateUsername = prefix + (lg == 0 ? '' : '' + randomDigits)
        console.log(`Random digits: ${randomDigits}`)
        console.log(`Candidate username: ${candidateUsername}`)
        const searchedUser = await UsersModel
            .findOne({Username: candidateUsername})
            .then(usr => console.log('found user when creating username: ' + usr))
            .catch(err => {
                console.log(`Error trying to find if user ${candidateUsername} exists: ${err}`)
                return null
            })
        if (searchedUser)
            continue
        foundUsername = candidateUsername
        break
    }
    if (foundUsername)
        return foundUsername
    return await generateUsername(prefix, lg + 1)
}
