import { UserModel } from '../Models'

interface GetUserParameters {
    Username: string
}

interface GetUserResults extends UserModel {
    status: string,
        
    UserID: string,
    FirstName: string,
    LastName: string,
    DateJoined: string,
    Email: string,
    Username: string,
}

export const GetUser = async (reqBody: GetUserParameters) : Promise<GetUserResults> => {
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