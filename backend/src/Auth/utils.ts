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
