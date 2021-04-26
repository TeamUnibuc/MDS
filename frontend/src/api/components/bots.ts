// On frontend convert mongo.ObjectId to string
export interface Bot {
    _id: string,
    Code: string,
    DateSubmitted: Date,
    authorId: string,
}

const getBots = async () => {
    const data = await fetch('/api/bots', {
        method: 'GET', headers: {'Content-Type': 'application/json'}
    });
    const content = await data.json();
    return content.bots;
}

const addBot = async (newBot : Bot) => {
    const reqBody = {bot: newBot}
    const data = await fetch('api/bots/new', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content.result
}

const deleteBot = async (id: string) => {
    const reqBody = {deleteId: id}
    const data = await fetch('api/bots/delete', {
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

const bots = { getBots, addBot, deleteBot }

export default bots;