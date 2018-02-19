import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import moment from 'moment';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import InputMask from 'react-input-mask';
import AlertContainer from 'react-alert';
var NumberFormat = require('react-number-format');

export default class bentuk_hutang_usaha extends Component {
	
	constructor(props) {
	  super(props);	
	  this.state = {

	  	data_supplier : [],
	  	jurnal_persediaan:[],
	  	jurnal_ppn:[],
	  	jurnal_hutang:[],
	  	initRow : [],
	  	tgltra:[],
	  	tgleff:[],
	  	counter:1,
	  	jumlah_row:0,
	  	nomor_po:[],
	  	nomor_invoice:[],
	  	persediaan:[],
	  	ppn:[],
	  	hutang_supplier:[],
	  	selectedSupplier:"",
	  	supplierName:"",
	  	selected_jurnal_persediaan:"",
	  	selected_jurnal_ppn:"",
	  	selected_jurnal_hutang_supplier:"",
	  	formData:[],//data untuk dikirim
	  	checkbox_no_ppn:false

	  };

	  this.tambahRow = this.tambahRow.bind(this);
	 
	}

	componentDidMount(){

		var _this = this;
		// data supplier

		
		axios.get(`http://${config.server}:${config.port}/${config.nmprsh}/supplier/listOption`)
		.then(function(response) {
		    _this.setState({ data_supplier: response.data });
		}).catch(function(err) {
		    console.log(err);
		});		

		axios.get(`http://${config.server}:${config.port}/${config.nmprsh}/data/akun_jurnal_standar/${3}/${3}`)
		.then(function(response) {
		    _this.setState({ jurnal_persediaan: response.data })
		}).catch(function(err) { console.log(err); });

		axios.get(`http://${config.server}:${config.port}/${config.nmprsh}/data/akun_jurnal_standar/${3}/${4}`)
		.then(function (response){			
			_this.setState({ jurnal_ppn:response.data })
		}).catch(function (err) { console.log(err); });

		axios.get(`http://${config.server}:${config.port}/${config.nmprsh}/data/akun_jurnal_standar/${3}/${5}`)
		.then(function (response){			
			_this.setState({ jurnal_hutang:response.data })
		}).catch(function (err) { console.log(err); });
	}

	tambahRow(e){
		
		e.preventDefault();
		this.setState({ counter: this.state.counter + 1 });		
	}

	removeRow(i){
		
		let nomor_po = this.state.nomor_po.slice();
		let nomor_invoice = this.state.nomor_invoice.slice();
		nomor_po.splice(i,1);
		nomor_invoice.splice(i,1);
		this.setState({
			counter:this.state.counter-1,			
			nomor_po,
			nomor_invoice
		})
	}

	createRows(){
		let row = [];
		for (let i = 0; i < this.state.counter; i++) {
			var j = i + 1;
			row.push(
				<tr key={i}>			
					<td>{j}</td>
					<td><input type="text" className="form-control input-sm" value={this.state.nomor_po[i] || ''} onChange={this.handlePO.bind(this,i)}/></td>											
					<td><input type="text" className="form-control input-sm" value={this.state.nomor_invoice[i] || ''} onChange={this.handleInvoice.bind(this,i)}/></td>											
					<td><InputMask mask="99/99/9999" value={this.state.tgltra[i] || moment().format('DD/MM/YYYY')} className="form-control input-sm" onChange={this.handleTanggalTransaksi.bind(this,i)} /></td>
					<td><InputMask mask="99/99/9999" value={this.state.tgleff[i] || moment().format('DD/MM/YYYY')} className="form-control input-sm" onChange={this.handleTanggalEfektif.bind(this,i)}/></td>
					<td>
						<NumberFormat 
							name="persediaan" 
							displayType={'input'} 
							value={ this.state.persediaan[i] || 0 } 
							onChange={this.handlePersediaan.bind(this,i)} 
							onBlur={this.handleBlurPersediaan.bind(this,i)} 
							readOnly={false} 
							thousandSeparator={true} 
							decimalSeparator={'.'} 
							decimalPrecision={2} 
							className="form-control input-sm" dir="rtl"/>
					</td>
					<td><NumberFormat name="ppn" displayType={'input'} value={ this.state.ppn[i] || 0 } onChange={this.handlePpn.bind(this,i)} readOnly={true} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl"/></td>
					<td><NumberFormat name="hutang_supplier" displayType={'input'} value={ this.state.hutang_supplier[i] || 0 } onChange={this.handleHutangSupplier.bind(this,i)} readOnly={true} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl"/></td>
					<td><button className="btn btn-xs btn-danger" onClick={ this.removeRow.bind(this,i)}>remove</button></td>
					{((row.length === this.state.counter-1) ? <td><button className="btn btn-xs btn-success" onClick={ this.tambahRow }>Add</button></td> : '')}
				</tr>
			)
		}
		return row || null;
	}

	handlePO(i,event){
		let nomor_po = this.state.nomor_po.slice();
		nomor_po[i] = event.target.value;
		this.setState({
			nomor_po
		})
	}

	handleInvoice(i,event){
		let nomor_invoice = this.state.nomor_invoice.slice();
		nomor_invoice[i] = event.target.value;
		this.setState({
			nomor_invoice
		})
	}

	handleTanggalTransaksi(i,event){
		// console.log(event);
		
		let tgltra = this.state.tgltra.slice();
		tgltra[i] = event.target.value;

		this.setState({
			tgltra
		});
	}

	handleTanggalEfektif(i,event){
		let tgleff = this.state.tgleff.slice();
		tgleff[i] = event.target.value;
		this.setState({
			tgleff
		})
	}

	handlePersediaan(i,event){

		let persediaan = this.state.persediaan.slice();
		var nilai = event.target.value;
		nilai = nilai.split(',').join('');
		persediaan[i] = nilai;

		this.setState({ persediaan });	
	}

	handleBlurPersediaan(i,event){

		var nilai = event.target.value;
		nilai = nilai.split(',').join('');

		if( this.state.checkbox_no_ppn ){
			var nilppn = 0;
		}else{
			var nilppn = parseFloat(nilai) * parseFloat(10) / parseFloat(100);
		}
		
		let hutang_supplier = this.state.hutang_supplier.slice();

		let hutang = parseFloat(nilai)+parseFloat(nilppn);
		hutang_supplier[i] = hutang;

		let ppn = this.state.ppn.slice();
		ppn[i] = nilppn;
		
		this.setState({ ppn,hutang_supplier });

	}

	handlePpn(i,event){
		let ppn = this.state.ppn.slice();
		ppn[i] = event.target.value;
		this.setState({
			ppn
		})	
	}

	handleHutangSupplier(i,event){
		let hutang_supplier = this.state.hutang_supplier.slice();
		hutang_supplier[i] = event.target.value;
		this.setState({
			hutang_supplier
		})	
	}

	handleSupplier(event){
		
		this.setState({
			selectedSupplier:event[0].value,
			supplierName:event[0].label
		});
	}

	handleJurnalPersediaan(event){
		console.log(event[0].value);
		this.setState({
			selected_jurnal_persediaan:event[0].value
		})
	}

	handleJurnalPpn(event){
		console.log(event[0].value);
		this.setState({
			selected_jurnal_ppn:event[0].value
		})
	}

	handleJurnalHutangSupplier(event){
		console.log(event[0].value);
		this.setState({
			selected_jurnal_hutang_supplier:event[0].value
		})
	}

	cekForm(){
		if(this.state.counter < 2 ){
			alert('Anda belum mengisi data hutang');
			return this.state.counter;
		}else{
			return 1;
		}
	}

	alertOptions = {
		offset: 75,
		position: 'top center',
		theme: 'dark',
		time: 5000,
		transition: 'fade'
	}

	showAlertError = (msg) => {
		this.msg.show(`${msg}`,{ time:5000,type:'error'})
	}

	showSuccessSave = (msg) => {
		this.msg.show(`${msg}`,{ time:5000,type:'success',onClose:()=>{ window.location.reload(); } })
	}

	handleSubmit(event){
		
		event.preventDefault();
		var tgltra = this.state.tgltra;
		var tgleff = this.state.tgleff;
		var nomor_po = this.state.nomor_po;
		var nomor_invoice = this.state.nomor_invoice;
		var persediaan = this.state.persediaan;
		var ppn = this.state.ppn;
		var hutang_supplier = this.state.hutang_supplier;
		var counter = this.state.counter;
		var selected_jurnal_persediaan = this.state.selected_jurnal_persediaan;
		var selected_jurnal_ppn = this.state.selected_jurnal_ppn;
	  	var selected_jurnal_hutang_supplier = this.state.selected_jurnal_hutang_supplier;

		var formData = this.state.formData.slice();
				
		var tempObj = {
			idprsh:11,
			idtran:3,
			idinpt:867,
			tginpt:moment().format('YYYY-MM-DD'),
			flotor:'T',
			idotor:0,
			idsupl:this.state.selectedSupplier,
			supplierName:this.state.supplierName			
		}

		formData.push(tempObj);			

		this.setState({ formData:formData });

		axios.post(`http://${config.server}:${config.port}/${config.nmprsh}/hutang/supplier/create/${this.state.selectedSupplier}`,{
			formData:formData,
			tgltra:tgltra,
			tgleff:tgleff,
			nomor_po:nomor_po,
			nomor_invoice:nomor_invoice,
			persediaan:persediaan,
			ppn:ppn,
			hutang_supplier:hutang_supplier,
			counter:counter,
			jurnal_persediaan:selected_jurnal_persediaan,
			jurnal_ppn:selected_jurnal_ppn,
			jurnal_hutang_supplier:selected_jurnal_hutang_supplier
		}).then(function (response){
			console.log(response.data);
			this.showSuccessSave(response.data);
		}).catch(function (err){
			console.log(err);
		});

	}

	togglePPN(e){
		console.log('no ppn : ',e.target.checked);
		this.setState({
			checkbox_no_ppn:e.target.checked
		})
	}

	render(){

		return(
			<div>
			<h4>Pembentukan Hutang Usaha</h4>
			<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, vel.</small>
			<div className="row">
				<form action="" className="form-horizontal" onSubmit={ this.handleSubmit.bind(this) }>
					<div className="form-group">
						<br/><br/>
						<AlertContainer ref={ a => this.msg = a } {...this.alertOptions} />					
					</div>					
					<div className="form-group">
						<label className="control-label col-sm-2">Supplier</label>
						<div className="col-sm-4">
							<Typeahead options={ this.state.data_supplier } onChange={ this.handleSupplier.bind(this) } bsSize={'sm'}/>	
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Persediaan</label>
						<div className="col-sm-4">
							<Typeahead options = { this.state.jurnal_persediaan } onChange={ this.handleJurnalPersediaan.bind(this) } bsSize={'sm'}/>	
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Ppn Masukan</label>
						<div className="col-sm-4">
							<Typeahead options = { this.state.jurnal_ppn } onChange={ this.handleJurnalPpn.bind(this) } bsSize={'sm'}/>	
						</div>
						<label className="col-sm-1 checkbox-inline">
							<input type="checkbox" value={ this.state.checkbox_no_ppn } checked={ this.state.checkbox_no_ppn } onChange={this.togglePPN.bind(this)}/>Tanpa PPN
						</label>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Hutang supplier</label>
						<div className="col-sm-4">
							<Typeahead options = { this.state.jurnal_hutang } onChange={ this.handleJurnalHutangSupplier.bind(this) } bsSize={'sm'}/>	
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-2 col-sm-offset-9">
							
						</div>
					</div>
					<div className="form-group">										
						<div className="col-sm-10 col-sm-offset-1">									
							<table width="1500" className="table table-condensed table-hover font-size-10" style={{ fontSize:9 }}>
								<thead>
									<tr>
										<th>NO</th>									
										<th>NOMOR PO</th>
										<th>NOMOR INVOICE</th>																				
										<th>TGL TRA</th>
										<th>TGL EFF</th>
										<th className="col-xs-2">PERSEDIAAN</th>
										<th className="col-xs-2">PPN MASUKAN</th>
										<th className="col-xs-2">HUTANG SUPPLIER</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody>
								{this.createRows()}
								</tbody>								
							</table>
						</div>
					</div>

					<div className="form-group">
						<div className="col-sm-2 col-sm-offset-10">
							<input type="submit" value="Submit" className="btn btn-sm btn-primary"/>
						</div>
					</div>

				</form>
			</div>
			</div>
		);
	}
}