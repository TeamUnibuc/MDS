import { UserModel } from '../Models'

interface GetUserParameters {
    UserID: string
}

interface GetUserResults extends UserModel {
    dummy? : 'dummy'
}

export const GetUser = async (reqBody : GetUserParameters) : Promise<GetUserResults> => {
    const data = await fetch('api/Users/Get', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}