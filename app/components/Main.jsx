import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Catalog from './Catalog.jsx'
import Content from './Content.jsx'
import Add from './Add.jsx'
import Page from './Page.jsx'
export default () => (
    <main>
        <Switch>
            <Route exact path='/' component={Page}/>
            <Route path='/catalog/:bookId' component={Catalog}/>
            <Route path='/content/:chapterId' component={Content}/>
            <Route path='/add' component={Add}/>
            <Route path='/page/:page' component={Page}/>
        </Switch>
    </main>
)