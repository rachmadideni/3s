import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './App';
import Login from './Login';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Login}/>
				<Route path='/app' component={App}/>
			</Switch>
		</BrowserRouter>
	);
}