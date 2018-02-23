import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './Login';
import { Tunai } from './page/penjualan';


// export default () => {

export default class Routes extends React.Component{
	
	constructor() {
		super();
		this.requireAuth = this.requireAuth.bind(this);
	}

	requireAuth(nextState, replace, callback) {
	    const token = window.sessionStorage.token;
	    console.log('token is ' + token);
	    if (!token) {
	        replace('/');
	        callback();
      		return;
	    }
	}

	logout(nextState, replace) {
		delete window.sessionStorage.token;
	}

	render(){

		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component = { Login } onEnter={(nextState,replace,callback)=>this.requireAuth(nextState,replace,callback)}/>
					<Route exact path='/app' component = { App }/>
					<Route path='/mod_sales' component = { Tunai }/>

				</Switch>
			</BrowserRouter>
		);
	}
}