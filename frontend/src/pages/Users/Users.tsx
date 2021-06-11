import { TitleDivider } from 'components/TitleDivider';
import { Profile } from 'pages';
import React from 'react';

export default function Users() : JSX.Element {

    return (<>
        <TitleDivider title='Personal information' />
        <Profile />
    </>);
}