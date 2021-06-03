import { RequestStatus, SubmissionModel } from '../Models'

interface GetAllParameters {
    requested_submissions : number,
    requested_offset : number,
    GameID?: string,
    UserID?: string,
    order_by: string,
    result_order: string,
}

interface GetAllResults extends RequestStatus {
    submissions_found: number,
    submissions_returned: number,

    submissions: Array<SubmissionModel>
}

export const GetAll = async (reqBody : GetAllParameters) : Promise<GetAllResults> => {
    const data = await fetch('/api/Submissions/GetAll', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}