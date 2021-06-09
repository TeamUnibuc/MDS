import React from 'react';
import New from './Components/New/New';
import Search from './Components/Search/Search';
import Update from './Components/Update/Update';
import View from './Components/View/View';
import { Switch, Route } from 'react-router-dom'

export default function Problemset() : JSX.Element {

    return (
        <Switch>
            <Route key="Default" path="/problemset/" exact component={Search}/>
            <Route key="Search" path="/problemset/search" exact component={Search} />
            <Route key="View" path="/problemset/view" exact component={View} />
            <Route key="New" path="/problemset/new" exact component={New}/>
            <Route key="Update" path="/problemset/update" exact component={Update}/>
        </Switch>
    );
}