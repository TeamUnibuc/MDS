import { UserModel } from '../Models'

interface GetUserParameters {
    Username: string
}

interface GetUserResults extends UserModel {
    status: string,
        
    UserID: string,
    Username: string,
}

export const GetByUsername = async (reqBody: GetUserParameters) : Promise<GetUserResults> => {
    const data = await fetch('api/Users/GetByUsername', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })

    return data.json()
    .then(res => {
        res.DateJoined = new Date(res.DateJoined)
        return res
    });
}