// On frontend convert mongo.ObjectId to string
export interface User {
    // _id: string,
    FirstName: string,
    LastName: string,
    Email: string,
    UserName: string,
    TotalPoints?: number,
    DateJoined?: Date
}

const getUsers = async () => {
    const data = await fetch('/api/users', {
        method: 'GET', headers: {'Content-Type': 'application/json'}
    });
    const content = await data.json();
    return content.users;
}

const addUser = async (newUser : User) => {
    const reqBody = {user : newUser}
    const data = await fetch('api/users/add', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content.result
}

const deleteUser = async (id: string) => {
    const reqBody = {deleteId: id}
    const data = await fetch('api/users/delete', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })

    const content = await data.json()
    return content.result
}

// const updateBot = async () => {
//     const data = await fetch('/api/bots', {
//         method: 'PUT', headers: {'Content-Type': 'application/json'}
//     });
// }

const users = { getUsers, addUser, deleteUser }

export default users;