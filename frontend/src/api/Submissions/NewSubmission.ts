interface NewSubmissionParameters {
    game_id: string,
    submission_code: string,
}

interface NewSubmissionResults {
    error_message?: string,
    status: 'ok' | 'fail',
    submission_id?: string
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