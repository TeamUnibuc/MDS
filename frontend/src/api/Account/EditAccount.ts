import { RequestStatus } from '../Models'

interface EditAccountParameters {
    FirstName: string,
    LastName: string,
    Username: string,
    VisibleEmail: boolean
}

interface EditAccountResults extends RequestStatus {
    dummy?: 'dummy'
}

export const EditAccount = async (reqBody : EditAccountParameters) : Promise<EditAccountResults> => {
    const data = await fetch('api/Account/Edit', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}