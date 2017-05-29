import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Catalog from './Catalog.jsx'
import Content from './Content.jsx'
export default () => (
    <main>
        <Switch>
            <Route exact path='/' component={Catalog}/>
            <Route path='/catalog/:bookId' component={Catalog}/>
            <Route path='/content/:chapterId' component={Content}/>
        </Switch>
    </main>
)