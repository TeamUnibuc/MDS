

export const GetOne = async (reqBody : {game_id: string}) : Promise<void> => {
    const data = await fetch('api/games/GetGame', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}