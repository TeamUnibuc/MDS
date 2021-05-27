import { SubmissionModel } from '../Models'

interface GetAllParameters {
    requested_games : number,
    requested_offset : number,
    game_id?: string,
    user_id?: string,
    order_by: string,
    result_order: string,
}

interface GetAllResults {
    error_message?: string,
    status: 'ok' | 'fail',
    submissions_found: number,
    submissions_returned: number,

    submissions: Array<SubmissionModel>
}

export const GetAll = async (reqBody : GetAllParameters) : Promise<GetAllResults> => {
    const data = await fetch('api/Submissions/GetAll', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}