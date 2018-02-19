import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import { BrowserRouter } from 'react-router-dom'

export default class Index extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {};
	}

	render(){
		return (			
            <BrowserRouter>
                <App />
            </BrowserRouter>            
		);
	}
}

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)