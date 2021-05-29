import React from 'react';

interface ApiTesterContextType {
    apiResponse: string,
    setApiResponse : React.Dispatch<React.SetStateAction<string>>
}

const ApiTesterContext = React.createContext<ApiTesterContextType>({
    apiResponse: '',
    setApiResponse: () => ({})
})
export { ApiTesterContext }