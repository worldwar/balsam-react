import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Catalog from './Catalog.jsx'
import Content from './Content.jsx'
import Books from './Books.jsx'
import Add from './Add.jsx'
export default () => (
    <main>
        <Switch>
            <Route exact path='/' component={Books}/>
            <Route path='/catalog/:bookId' component={Catalog}/>
            <Route path='/content/:chapterId' component={Content}/>
            <Route path='/add' component={Add}/>
        </Switch>
    </main>
)