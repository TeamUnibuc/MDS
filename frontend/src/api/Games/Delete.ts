import { RequestStatus } from '../Models'

interface DeleteResults extends RequestStatus {
    dummy?: 'dummy'
}

export const Delete = async (reqBody : {GameID: string}) : Promise<DeleteResults> => {
    const data = await fetch('/api/Games/Delete', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}