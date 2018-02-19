import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DaftarCoa from './components/daftarcoa';
import InputCoa from './components/input_coa';
import InputSaldo from './components/input_saldo';

import UpdateCoa from './components/update_coa';

export default class Main extends Component{
	render(){
		return (
			<div>
				<Route exact path = '/' component = { DaftarCoa } />
				<Route exact path = '/input' component = { InputCoa } />
				<Route exact path = '/update/coa/:idacct' component = { UpdateCoa } />
				<Route exact path = '/input/saldo/:idacct' component = { InputSaldo } />
			</div>			
		);
	}	
}