import React from 'react'

type Props = {
    name: string,
    children: React.ReactNode,
}

export const GenericPage = ({name, children}: Props): JSX.Element => 
{
    return <div id={`page-${name}`}>
        {children}
    </div>
}