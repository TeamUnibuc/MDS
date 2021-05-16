const jsonWrapper = (FetchRequest: Promise<Response>) =>
{
    return FetchRequest.then(async response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to get auth status from server, http code: " + response.status);
    })
}

interface AuthStatusResponse {
    authenticated: boolean,
    user: AuthUser,
}

export interface AuthUser {
    FirstName: string,
    LastName: string,
    Email: string,
    Username: string,
    DateJoined: Date,
    Providers: {
        googleID?: string,
        facebookID?: string,
        twitterID?: string,
        githubID?: string,
    },
}

export const getAuthStatus = (): Promise<AuthStatusResponse> =>
{
    const prom = fetch("auth", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    return jsonWrapper(prom);
}
