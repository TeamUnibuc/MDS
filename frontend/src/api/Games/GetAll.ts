interface GetAllParameters {
    requested_games : number,
    requested_offset : number,
    order_by?: string,
    result_order?: string,
}

export const GetAll = async (reqBody : GetAllParameters) : Promise<void> => {
    const data = await fetch('api/games/GetAll', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}