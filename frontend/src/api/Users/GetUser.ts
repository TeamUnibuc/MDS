import { UserModel } from '../Models'

interface GetUserParameters {
    UserID: string
}

interface GetUserResults extends UserModel {
    status: string,
    FirstName: string,
    LastName: string,
    DateJoined: Date,
    Email: string,
    Username: string,
    
    error_message?: string,
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