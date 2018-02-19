import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

/*react-select*/
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/*DatePicker*/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import '../datepicker/react-datepicker.css';

import moment from 'moment';

// Tabel komponen
// import Tabel from '../components/Tabel';

var NumberFormat = require('react-number-format');

export default class bayar extends Component {
	constructor(props) {
	  super(props);	
	  this.state = {
	  	
	  	data_supplier:[],
	  	data_hutang_supplier:[],
	  	selectedSupplier:"",
	  	amount_to_pay:[],
	  	supplier_name:"",
	  	keterangan1_display:"",
	  	keterangan2_display:"",
	  	keterangan1:[],
	  	keterangan2:[],
		total_amount_display:0,
	  	tgltra: moment(),
	  	tgleff: moment(),

	  	selectValue:"ABADI",
	  	initial_amount:[],
	  	amountBayar:0,
	  	

	  	filterKeyword:"",
	  	ketera:"",
	  	ketera2:"",
	  	jurnal_standar:[],
	  	akun_jurnal_standar:[],
	  	selectedJurnal:[],
	  	list_accounts:[],
	  	selected_accounts:[]
	  
	  };
	}

	componentDidMount(){
		
		var _this = this;	
		// data supplier
		axios.get('http://localhost:3001/yfd/data/supplier').then(function (response) {
			
			//console.log('output data supplier : ');
			//console.log(response.data);
			
			_this.setState({ data_supplier : response.data });


		}).catch(function (err) {
			console.log(err);
		});

		// data jurnal standar
		axios.get(`http://localhost:3001/yfd/data/jurnal_standar/${5}`).then(function (response){
			
			//console.log('output template jurnal standar : ');
			//console.log(response.data);

			_this.setState({jurnal_standar:response.data})
		
		}).catch(function (err) {
			console.log(err);
		});

	}

	updateValue(newvalue) {

		var _this = this;		
		var posupplierid = newvalue.value;
		var posuppliername = newvalue.label;
		console.log(posuppliername);
	
		_this.setState({
			initial_amount:[],
			amountBayar:0
		});
		//console.log(' State changed to ' + newValue.value);

		axios.get(`http://localhost:3001/yfd/data/supplier/hutang/${posupplierid}/3`).then(function (response){
			_this.setState({
				selectValue: newvalue,
				data_hutang_supplier: response.data,
				ketera:'PEMBAYARAN HUTANG USAHA PADA ' + posuppliername
			});			
		}).catch(function (err){
			console.log(err);
		});		
	}

	_onChangeSupplier(newvalue){

		var _this = this;
		var posupplierid = newvalue.value;
		var posuppliername = newvalue.label;

		// reset state jika user memilih supplier lain
		// amount_to_pay = array nilai hutang yang akan dibayar
		// total_amount__display = nilai total hutang yang akan dibayar untuk keperluan display saja.
		_this.setState({ amount_to_pay : [],total_amount_display : 0 });

		// ambil data hutang berdasarkan supplier yang dipilih
		axios.get(`http://localhost:3001/yfd/data/supplier/hutang/${posupplierid}/3`).then(function (response){
			_this.setState({ 
				selectedSupplier: newvalue,
				supplier_name : posuppliername,
				data_hutang_supplier: response.data,
				ketera : 'PEMBAYARAN HUTANG USAHA PADA ' + posuppliername				
			});			
		}).catch(function (err){
			console.log(err);
		});

	}

	_onChangeCheckboxHutang(e){		

		let amount_to_pay = this.state.amount_to_pay.slice();
		let key_value_hutang = { 'idinvo': e.target.id, 'hutang': parseFloat(e.target.value) };
		// Object.keys = mengambil key prop dari object & mengembalikan sebagai array. ex:['idinvo','hutang']
		let keys = Object.keys(key_value_hutang);

		// jika hutang dipick (checked)
		if(e.target.checked){					

			amount_to_pay.push(key_value_hutang);
			let total_amount_display = amount_to_pay.reduce((prev,next) => prev + next.hutang,0);

			this.setState({
				amount_to_pay :amount_to_pay,
				total_amount_display:total_amount_display
			});
		
		}else{
			// jika hutang batal pick (unchecked)
			amount_to_pay.splice(
				//Get the index of the first element in the array that has a value
				amount_to_pay.findIndex((obj)=>{
					return keys.every( (k)=>{ return key_value_hutang[k] === obj[k]; } )
			}),1);

			let total_amount_display = amount_to_pay.reduce((prev,next) => prev + next.hutang,0);

			this.setState({
				amount_to_pay : amount_to_pay,
				total_amount_display : total_amount_display
			});

		}

		console.log(this.state.amount_to_pay);

	}

	changeCheckbox(e){

		var amount = this.state.initial_amount.slice();
		//var mySet = this.state.mySet;
		var keyval = {'idinvo': e.target.id, 'hutang': parseFloat(e.target.value) };
		let keys = Object.keys(keyval);				
		
		if(e.target.checked){

			amount.push(keyval);
			const total = amount.reduce((prev,next) => prev + next.hutang,0);			
			
			this.setState({
				initial_amount:amount,
				amountBayar:total
			});

		}else{

			amount.splice(
				amount.findIndex((obj)=>{
					return keys.every(function(k){
						return keyval[k] === obj[k];
					});
				}),
			1);

			const total = amount.reduce((prev,next) => prev + next.hutang,0);
			this.setState({
				initial_amount:amount,
				amountBayar:total
			});
		}

		console.log(this.state.amountBayar);

	}

	handleChange(date,whatdate) {

		// console.log(e.target);
	    /*this.setState({
	      tgltra: date,
	      tgleff: date
	    });*/

		this.setState({
			[whatdate]:date
		})

	  }

	handleFilterchange(e){
		this.setState({
			filterKeyword:e.target.value.substr(0,20)
		})
	}

	handleketerangan(e,what){
		console.log(`e : ${e.target.value} , what : ${what}`);
		this.setState({
			[what]:e.target.value
		})
	}

	handleSubmit(e){
		e.preventDefault();

		// var _this = this;
		
		// dt_acct_gl_master
		// IDPRSH,IDTRAN,IDINPT,TGINPT,NOTRAN,TGLTRA,TGLTRA,TGLEFF,KETERA,JMTRAN,FLOTOR='T',IDOTOR=0,TGOTOR=NULL,IDHTUS='diambil dari kolom id tabel dt_acct_invoice'
		
		// dt_acct_gl_detail
		// IDGLAC,IDACCT,NOTRAN,KODACC,JUMTRA

		// dt_acct_invoice_bayar
		// IDINVO,TGLTRA,JMTRAN,IDINPT,NOTRAN,IDSUPL='S001'

		// persiapan variabel 
		// var userid = userid;
		// var ts = Math.round((new Date()).getTime() / 1000);
		// var notran = userid + '' +ts

		// var idsupl = this.state.selectedSupplier;
		// var tginpt = moment().format('YYYY-MM-DD HH:MM:SS');
		// var tgltra = this.state.tgltra.format('YYYY-MM-DD');
		// var tgleff = this.state.tgleff.format('YYYY-MM-DD');
		// var ketera = this.state.ketera;
		// var ketera2 = this.state.ketera2;
		// var jumtra = this.state.amountBayar;
		// var flotor = 'T';
		// var idotor = 0;
		// // var idhtus = idinvo; // id hutang
		// var daftar_hutang = this.state.initial_amount;// idinvo & nilai hutang
		// var daftar_idacct = '';
		// var daftar_kodacc = '';

		// console.log(`initial amount : ${this.state.initial_amount}`);


		/* format data simpan */
		/*
		[
			{
				idprsh:idprsh,
				idtran:idtran,
				idinpt:idinpt,
				tginpt:tginpt,
				notran:notran,
				tgltra:tgltra,
				tgleff:tgleff,
				ketera:ketera,
				ketera2:ketera2,
				jmtran:jmtran,
				flotor:flotor,
				idotor:idotor,
				tgotor:tgotor,
				idhtus:idinvo
			},

		]

		[
			{
				idacct:idacct,
				notran:notran,
				kodacc:kodacc,
				jumtra:jumtra
			}
		]
		
		IDINVO,TGLTRA,JMTRAN,IDINPT,NOTRAN,IDSUPL='S001'

		[
			{
				idinvo:idinvo,
				tgltra:tgltra,
				jmtran:jmtran,
				idinpt:idinpt,
				notran:notran,
				idsupl:idsupl
			}
		]

		*/



		// console.log(this.state.initial_amount);

		/*axios.post(`http://localhost:3001/yfd/data/supplier/hutang/bayar`,{
			idsupl: this.state.selectValue,
			amount: this.state.amountBayar,

		}).then(function (response){
			
			_this.setState({
				selectValue: newvalue,
				data_hutang_supplier: response.data,
				ketera:'PEMBAYARAN HUTANG USAHA PADA ' + posuppliername
			});

		}).catch(function (err){
			console.log(err);
		});*/


		// contoh post dari shoutbox
		/*var _this = this;
				axios.post('http://103.77.205.58:2316/chat/insertMessage',{
					NMLGKP : this.state.NMLGKP,
					NIPPEG : this.state.NIPPEG,
					ISIPSN : this.state.text
				})
				.then(function (response) {
					console.log(response);

					if(response.data.success){
				    	console.log('message sent');
						_this.setState({
							text:'',
							isMessageSend:!this.state.isMessageSend
						});
					}

					_this.showTodayMessages();

				}).catch(function (err) {
					console.log(err);
				});*/


		// console.log(`e targetvalue dari submit:${e.target.value}`)
	}	

	_onChangeJurnal(e){
		
		//console.log(index + ' *** ' + e.target.value);
		console.log('e => ');
		console.log(e);
		var _this = this;
		var seljurnal = _this.state.selected_accounts.concat();
		// if(seljurnal.length < 2){
			seljurnal.concat(e);			
		// }

		setTimeout(()=>{
			this.setState({
				selected_accounts:seljurnal
			});
		}, 2);
		console.log(seljurnal);

		/*var sel3 = seljurnal.filter(function(value){
		  return value===2;
		});

		var index = seljurnal.indexOf(1);
		if (index > -1) {
		    seljurnal.splice(index, 1);
		}
		var index2 = seljurnal.indexOf(2);
		if (index2 > -1) {
		    seljurnal.splice(index2, 1);
		}*/


		// seljurnal.filter(val=> val===1 || val===2)
		// console.log(seljurnal);
		
		//
		/*


		this.setState({
			selectedJurnal:seljurnal
		});
		//seljurnal.splice(e,0,val.);

		console.log(seljurnal);*/



		/*
		console.log(index);

		console.log('value :');
		console.log(value);*/

		// console.log(`change jurnal parent : ${d} & ${e}`);
		
		/*var seljurnal = this.state.selectedJurnal.slice();
		seljurnal.splice(index,0,value);
		
		this.setState({
			selectedJurnal:seljurnal
		});*/
		// console.log(this.state.selectedJurnal);
	}	

	render(){

		// filter data hutang
		const filterHutang = this.state.data_hutang_supplier.filter((keyword)=>{
			return keyword.NOINVO.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1;
		})

		return(
			<div className="container">
				<div className="page-title"><h5>Pembayaran Hutang usaha</h5></div>

				<div className="row">
					<div className="col-md-12">
						
						<form action="" className="form-horizontal">							
							<div className="form-group">
								<label htmlFor="" className="control-label col-md-3">jenis bayar</label>
								<div className="form-group">
									<label className="radio-inline">
								      <input type="radio" name="optradio" />Single
								    </label>
								    <label className="radio-inline">
								      <input type="radio" name="optradio" />Multi
								    </label>
								</div>
							</div>
							<div className="form-group">								
								<label htmlFor="" className="control-label col-md-3">Supplier</label>
								<div className="col-sm-4">									

									<Select name="data_supplier" options = { this.state.data_supplier } value = { this.state.selectedSupplier } 
										onChange = { this._onChangeSupplier.bind(this) } clearable = { false } />

								</div>
							</div>
							<div className="form-group">								
								<label htmlFor="" className="control-label col-md-3">Invoice</label>
								<div className="col-sm-8" style={{ maxHeight:200,overflow:'auto' }} >
									<table className="table table-bordered table-hover font-size-10">
										<thead>
											<tr>
												<th>No.</th>
												<th>No. Invoice</th>
												<th>Tgl. Invoice</th>
												<th>Outstanding</th>
												<th>action</th>
											</tr>
										</thead>
										<tbody>
										{filterHutang.map((hutang)=>{
											return (
												<tr key={hutang.IDINVO}>
													<td>{hutang.IDINVO}</td>
													<td>{hutang.NOINVO}</td>
													<td>{hutang.TGINVO}</td>
													<td className="text-right"><NumberFormat displayType={'text'} value={hutang.NILTOT} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} /> </td>
													<td>
														
														<input type="checkbox" id={ hutang.IDINVO } value = { hutang.NILTOT } 
															onChange={this._onChangeCheckboxHutang.bind(this)} />

													</td>
												</tr>
											)
										})}											
										</tbody>
									</table>
								</div>
							</div>
						
							<div className="form-group">
								<label htmlFor="" className="control-label col-md-3">Nilai Pembayaran</label>
								<div className="col-sm-3">									
									<NumberFormat displayType={'input'} value={this.state.total_amount_display} readOnly={true} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl"/>
								</div>								
							</div>
							<hr/>
							<div className="form-group">
								<label htmlFor="" className="control-label col-md-3">Tanggal</label>
								<div className="col-sm-2">									
									<DatePicker selected={this.state.tgltra} readOnly={true}  minDate={moment()} maxDate={moment()} dateFormat="DD/MM/YYYY" onChange={ (e) => this.handleChange(e,'tgltra')} className="form-control input-sm"/>
								</div>
								<div className="col-sm-2">									
									<DatePicker selected={this.state.tgleff} dateFormat="DD/MM/YYYY" maxDate={moment().add(0, "days")} onChange={ (e) => this.handleChange(e,'tgleff')} className="form-control input-sm"/>
								</div>								
							</div>
							<div className="form-group">
								<label htmlFor="" className="control-label col-md-3">Keterangan</label>
								<div className="col-sm-5">
									<input type="text" value={this.state.ketera} onChange={(e)=> this.handleketerangan(e,'ketera')} className="form-control input-sm" placeholder="Keterangan"/>
								</div>																
							</div>
							<div className="form-group">
								<label htmlFor="" className="control-label col-md-3"></label>
								<div className="col-sm-5">
									<input type="text" value={this.state.ketera2} onChange={(e)=> this.handleketerangan(e,'ketera2')} className="form-control input-sm" placeholder="Keterangan Tambahan"/>
								</div>																
							</div>							
							{
								this.state.jurnal_standar.map((jurnal)=>{
									return (
										<div className="form-group" key={jurnal.ID}>
											<div className="control-label col-md-3">{jurnal.KETERA}</div>
											<div className="col-sm-4">																								
												<AkunJurnal id={jurnal.ID} onChangeJurnal={this._onChangeJurnal.bind(this)} />																					
											</div>
											<div className="col-sm-2">												
											    <PosisiJurnal id={jurnal.ID} val={jurnal.KODACC} />
											</div>
											<div className="col-sm-2">
												<NilaiJurnal id={jurnal.ID} val={this.state.total_amount_display}/>
											</div>
										</div>		
									)
								})
							}
							<hr/>
							<div className="form-group">
								<div className="col-sm-4 col-sm-offset-3">
									<button type="reset" className="btn btn-sm btn-default">Batal</button>&nbsp;&nbsp;
									<input type="submit" className="btn btn-sm btn-success" onClick={this.handleSubmit.bind(this)} value="Simpan Transaksi"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

class AkunJurnal extends Component {

	constructor(props) {
	  super(props);	
	  this.state = {
	  	akun_jurnal_standar:[],
	  	selectValue:[],
	  	selectAccount:[]
	  };
	}
	
	componentWillReceiveProps(newProps){
		this.fetchData(this.props.id);
	}

	fetchData(id){

		var _this = this;
		var sel = this.state.selectValue.slice();
		sel.push(id);

		axios.get(`http://localhost:3001/yfd/data/akun_jurnal_standar/${5}/${id}`)
		.then(function (response){
			_this.setState({
				akun_jurnal_standar:response.data,
				selectValue:sel
			})
		}).catch(function (err) {
			console.log(err);
		});			

	}

	updateValue(newvalue,newv) {

		var _this = this;
		var sel = this.state.selectValue.slice();
		sel[newvalue] = newv.value;

		console.log(`new value : ${newvalue}, newv : ${newv}`);
		console.log(sel[newvalue]);
		
		_this.setState({ selectValue: sel });

		// _this.fetchData(this.props.id);
		// this.props.onChangeJurnal(this.state.selectValue);
		

	}

	_onChangeJurnal(e,val){

		var _this = this;
		var sel = this.state.selectValue.slice();
		var sel2 = this.state.selectAccount.slice();
			
		let obj = { 'id': e, 'val': val.value };
		sel2.push(obj);

		sel[e] = val.value;		
		_this.setState({ selectValue: sel, selectAccount: sel2 });		

		this.props.onChangeJurnal(sel2);
		//console.log(this.state.selectValue);
		//sel.splice(1,1,val.value);

		/*if(sel.length < 2){
			sel.push(val.value);
			var ind = sel.findIndex((idx)=>{
				return idx === val.value
			});			
		}*/
		// console.log(sel);

	}

	render(){
		return (
			
			<Select name="akun_jurnal_standar" options = { this.state.akun_jurnal_standar } value = { this.state.selectValue[this.props.id] }
				onChange = { this._onChangeJurnal.bind(this,this.props.id) } clearable = { false } ></Select>
			
		);
	}
	//this.updateValue.bind(this,this.props.id)
}

class PosisiJurnal extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	selectedOption:[]
	  };
	}

	componentDidMount(){
		var _this = this;
		var sel = this.state.selectedOption.slice();
		sel[this.props.id] = this.props.val;
		_this.setState({ selectedOption: sel });

		// console.log(`props: ${sel[this.props.id]}`);

		// this.state.selectedOption[this.props.id]
	}

	render(){
		return (
			<div>
				<label className="radio-inline">
					<input type="radio" name={`flacct${this.props.id}`} defaultValue={this.state.selectedOption[this.props.id]} checked={this.state.selectedOption[this.props.id] === 'D'} />Debet</label>
			    <label className="radio-inline">
			    	<input type="radio" name={`flacct${this.props.id}`} defaultValue={this.state.selectedOption[this.props.id]} checked={this.state.selectedOption[this.props.id] === 'K'} />Kredit</label>
			</div>
		);
	}

}

class NilaiJurnal extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	// array nilai utk masing-masing jurnal
	  	nilai:[]
	  };
	}

	componentDidMount(){
		var _this = this;
		var sel = this.state.nilai.slice();
		sel[this.props.id] = this.props.val;
		_this.setState({ selectedOption: sel });

		// console.log(`props: ${sel[this.props.id]}`);

		// this.state.selectedOption[this.props.id]
	}

	handleChange(e){
		console.log(`e target value : ${e.target.value}`)
	}

	render(){
		//value={this.state.nilai[this.props.id]} 
		return(
			<NumberFormat displayType={'input'} value={this.props.val} onChange={this.handleChange.bind(this)}
				readOnly={true} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl" />
			
		);
	}
}