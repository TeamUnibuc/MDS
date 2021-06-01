import { RequestStatus, AccountModel } from '../Models'

interface AccountDetailsParameters {
    dummy?: 'dummy'
}

interface AccountDetailsResults extends RequestStatus, AccountModel {
    
}

export const AccountDetails = async (reqBody : AccountDetailsParameters) : Promise<AccountDetailsResults> => {
    const data = await fetch('api/Account/Details', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}