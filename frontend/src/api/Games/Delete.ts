

export const Delete = async (reqBody : {game_id: string}) : Promise<void> => {
    const data = await fetch('api/games/Delete', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}