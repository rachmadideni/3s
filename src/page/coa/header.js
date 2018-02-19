import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Modal from 'react-modal';
// import ModalStyles from './styles/modalStyles.js';
// import InputCoa from './components/input_coa';
// import simpleModal from 'react-simple-modal';

export default class Header extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {	  	
	  };
	}

	componentWillMount(){
		//Modal.setAppElement('portal');

	}	

	render(){
		return (
			<div>
                <div id="page-title"><h4><b>DATA MASTER REKENING</b></h4><small>Pengelolaan Rekening dan saldo awal Rekening</small></div>
                <div className="divider"></div>                   
                <div className="example-box-wrapper">                            
                    <div className="row">
                        <div className="col-md-12">                           
                            <span className="pull-left">
                            	<Link to='/' className="btn btn-sm btn-primary no-border"><i className="glyph-icon icon-list-alt"></i> Daftar Rekening</Link>&nbsp;                            	                            	                            		
                            </span>

                            <span className="pull-left">
                            	<Link to='/input' className="btn btn-sm btn-primary no-border"><i className="glyph-icon icon-plus-circle"></i> Input / Update Rekening</Link>&nbsp;                            	
                            </span>

                            <span className="pull-left">
                            	<Link to='/input/saldo' className="btn btn-sm btn-primary no-border"><i className="glyph-icon icon-plus-circle"></i> Input / Update Saldo</Link>&nbsp;                                
                            </span>

                            <span className="pull-right">
                                <a target="_blank" href="#" className="btn btn-sm btn-info no-border" title=""><i className="glyph-icon icon-cog"></i> Print PDF</a>&nbsp;
                            <a href="#" className="btn btn-sm btn-success no-border" title=""><i className="glyph-icon icon-file-excel-o"></i> Export Excel</a>
                            </span>
                        </div>
                    </div>
                    <div className="divider"></div><br/>                    
                </div>                				
            </div>
		);
	}
}