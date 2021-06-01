import { RequestStatus } from 'api/Models';

interface NewSubmissionParameters {
    GameID: string,
    SubmissionCode: string,
}

interface NewSubmissionResults extends RequestStatus {
    SubmissionID?: string
}

export const NewSubmission = async (reqBody : NewSubmissionParameters) : Promise<NewSubmissionResults> => {
    const data = await fetch('api/Submissions/New', {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    })
    const content = await data.json()
    return content;
}