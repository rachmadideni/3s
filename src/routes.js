import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';



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
				<div>
					<Route exact path='/' component = { Login } />
				{/*onEnter={(nextState,replace,callback)=>this.requireAuth(nextState,replace,callback)}*/}
					<Route path='/app' component = { App }/>
					
				</div>
			</BrowserRouter>
		);
	}
}