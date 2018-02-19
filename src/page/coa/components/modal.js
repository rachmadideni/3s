import React, { Component } from 'react';
import Modal from 'react-modal';
import InputCoa from './input_coa';
export default Class ModalPage extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	isActive:false
	  };
	}

	render(){
		return(

		);
	}
}

style={{
	overlay : {
		position          : 'fixed',
		top               : 0,
		left              : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : '#666666'
	},
	content : {
		position                   : 'absolute',
		zindex						: 1,
		top                        : '100px',
		left                       : '300px',
		right                      : '40px',
		bottom                     : '20px',
		border                     : '1px solid #ccc',
		background                 : '#fff',
		overflow                   : 'auto',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '4px',
		outline                    : 'none',
		padding                    : '20px'
	}
}}

className="ModalStyles.Modal" overlayClassName="ModalStyles.Overlay"