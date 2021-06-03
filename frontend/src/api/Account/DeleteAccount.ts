import { RequestStatus } from '../Models'

interface DeleteAccountParameters {
    dummy?: 'dummy'
}

interface DeleteAccountResults extends RequestStatus {
    dummy?: 'dummy'
}

export const DeleteAccount = async (reqBody : DeleteAccountParameters) : Promise<DeleteAccountResults> => {
    const data = await fetch('/api/Account/Delete', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}