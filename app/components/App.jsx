import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom'
import Catalog from './Catalog.jsx'
import Content from './Content.jsx'
import Add from './Add.jsx'
import Page from './Page.jsx'
import Base from './base.js';

export default (props) => (
  <HashRouter basename="">
  <Switch>
  	
  	<Base>
	    <Switch>
	      <Route exact path='/' component={Page}/>
	      <Route path='/catalog/:bookId' component={Catalog}/>
	      <Route path='/content/:chapterId' component={Content}/>
	      <Route path='/add' component={Add}/>
	      <Route path='/page' component={Page}/>
	    </Switch>
	  </Base>
	  </Switch>
  </HashRouter>
)