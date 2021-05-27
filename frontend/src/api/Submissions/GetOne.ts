import { RequestStatus, SubmissionModel } from 'api/Models';

interface Result{
    logs: string,
    won: boolean
}

interface GetOneResults extends RequestStatus, SubmissionModel {

    compiled: boolean,
    compilation_message?: string,
    results: Array<Result>,

    finished_evaluation: boolean
}

export const GetOne = async (reqBody : {SubmissionID: string}) : Promise<GetOneResults> => {
    const data = await fetch('api/Submissions/Details', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json();
    return content;
}