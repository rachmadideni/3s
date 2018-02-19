import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/*
rencana mau di reusable beberapa komponen
select Jenis Transaksi (masih belum jelas)
sumber penerimaan (penerimaan diterima dari) : input text
keterangan pertama (otomatis dibuat berdasarkan inputan sumber penerimaan dari )
keterangan tambahan
tanggal transaksi
tanggal efektif

inputan jurnal diambil dari settingan jurnal 

*/


export default class TransaksiPenerimaan extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	sumber_penerimaan:'',
	  	keterangan1:'',
	  	keterangan2:'',
	  	tgltra: moment(),
		tgleff: moment(),
	  };
	}

	_handleDate(date,whatdate) {
		this.setState({ [whatdate]:date });
	}

	render(){
		return (
			<div>
			<h4>Transaksi Penerimaan</h4>
			<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, vel.</small>
			<div className="row">
				<form className="form-horizontal">
					<div className="form-group">
						<label className="control-label col-sm-2">Di Terima dari</label>
						<div className="col-sm-4">
							<input type="text" className="form-control input-sm" value={ this.state.sumber_penerimaan } />
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Keterangan</label>
						<div className="col-sm-4">
							<input type="text" className="form-control input-sm" value={ this.state.Keterangan1 }  placeholder="Keterangan" />
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2"></label>
						<div className="col-sm-4">
							<input type="text" className="form-control input-sm" value={ this.state.Keterangan2 } placeholder="Keterangan tambahan" />
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Tanggal Transaksi</label>
						<div className="col-sm-2">
							<DatePicker 
								selected={this.state.tgltra} 
								maxDate={moment().add(0, "days")} 
								dateFormat="DD/MM/YYYY" 
								onChange={ (e) => this._handleDate(e,'tgltra')} 
								className="form-control input-sm"/>
						</div>
						<label className="control-label col-sm-2">Efektif</label>
						<div className="col-sm-2">
							<DatePicker 
								selected={this.state.tgleff} 
								dateFormat="DD/MM/YYYY" 
								maxDate={moment().add(0, "days")} 
								onChange={ (e) => this._handleDate(e,'tgleff')} 
								className="form-control input-sm"/>
						</div>
					</div>

					<div className="form-group">
						<div className="divider"></div>
					</div>
					<br/>

					{/* input jurnal */}

					<div className="form-group">
						<label className="control-label col-sm-2"></label>
						<div className="col-sm-4">
							
						</div>
					</div>






				</form>
			</div>
			</div>
		);
	}
}

class JurnalStandar extends Component{
	render(){
		return (
			<Select name="jurnal_standar" options = { this.props.ds } value = { this.state.selectValue[this.props.id] }
				onChange = { this._onChangeJurnal.bind(this,this.props.id)} clearable = { false } ></Select>
		);
	}
}