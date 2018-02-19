import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

/*react-select*/
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/*DatePicker*/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
//validasi
// import FormErrors from '../components/FormErrors';

import config from '../config';
import AlertContainer from 'react-alert';
import PageLoader from 'react-loader';


var NumberFormat = require('react-number-format');

export default class bayar extends Component {
	constructor(props) {
	  super(props);	
	  this.state = {
	  		isLoadingSupplierData:true,  	
		  	data_supplier : [],
		  	data_hutang_supplier : [],
		  	selectedSupplier : "",
		  	formErrors : { selectedSupplier : "",amountToPay : "",selectedJurnal : "" },
		  	selectedSupplierValid : false,
		  	amountToPayValid : false,
		  	selectedJurnalValid : false,
		  	formValid : false,
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
		  	filterKeyword:"",
		  	ketera:"",
		  	ketera2:"",
		  	jurnal_standar:[],
		  	akun_jurnal_standar:[],
		  	selected_accounts:[],
		  	jurnal_validasi:[],
		  	isPageLoaded:false,
		  	userid:"",
		  	idprsh:"",
		  	selectedTipe:"F",
		  	paymentReadOnly:true	  		  
	  };

	  this._onChangeJurnal = this._onChangeJurnal.bind(this);
	}

	componentDidMount(){
		
		var _this = this;	
		// data supplier
		axios.get(`http://${config.server}:${config.port}/yfd/data/supplier`).then(function (response) {			
			_this.setState({ data_supplier : response.data,isLoadingSupplierData:false,isPageLoaded:true });
		}).catch(function (err) {
			console.log(err);
		});

		// data jurnal standar
		axios.get(`http://${config.server}:${config.port}/yfd/data/jurnal_standar/${5}`).then(function (response){
			_this.setState({ jurnal_standar:response.data });
		}).catch(function (err) {
			console.log(err);
		});

		// find Dom Node examples :
		
		const userid = ReactDOM.findDOMNode( window.document.getElementById('userid')).value;
		const idprsh = ReactDOM.findDOMNode( window.document.getElementById('idprsh')).value;
		// const userid = 867;
		// const idprsh = 9;
		console.log(`userid : ${userid},idprsh : ${idprsh}`);
		_this.setState({
			userid:userid,
			idprsh:idprsh
		});
		

	}

	updateValue(newvalue) {

		var _this = this;		
		var posupplierid = newvalue.value;
		var posuppliername = newvalue.label;
	
		_this.setState({ initial_amount:[] });

		axios.get(`http://${config.server}:${config.port}/yfd/data/supplier/hutang/${posupplierid}/3`).then(function (response){
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
		
		// reset state jika user merubah supplier		
		_this.setState({ 
			amount_to_pay:[],
			total_amount_display : 0 
		});

		if( newvalue != null ){

			var posupplierid = newvalue.value;
			var posuppliername = newvalue.label;

			// ambil data hutang berdasarkan supplier
			axios.get(`http://${config.server}:${config.port}/yfd/data/supplier/hutang/${posupplierid}/3`).then(function (response){
				
				_this.setState({ 
					selectedSupplier: newvalue,
					supplier_name : posuppliername,
					data_hutang_supplier: response.data,
					ketera : 'PEMBAYARAN HUTANG USAHA PADA ' + posuppliername,
					keterangan1_display : 'PEMBAYARAN HUTANG USAHA PADA ' + posuppliername				
				},()=>{ _this.validateField('selectedSupplier',newvalue.value) });

			}).catch(function (err){
				console.log(err);
			});
		}

	}

	validateField(fieldName,value){

		let fieldValidationErrors = this.state.formErrors;
		let selectedSupplierValid = this.state.selectedSupplierValid;
		let amountToPayValid = this.state.amountToPayValid;
		let selectedJurnalValid = this.state.selectedJurnalValid;
		let arr_jurnal = this.state.jurnal_validasi.concat();

		let PaymentType = this.state.selectedTipe;
		let PaymentIsValid = "";

		switch(fieldName){
			case 'selectedSupplier':
				selectedSupplierValid = value.length > 0;
				fieldValidationErrors.selectedSupplier = selectedSupplierValid ? '' : ' Belum memilih Supplier';				
				break;
			case 'amountToPay':

				amountToPayValid = value.length > 0;
				fieldValidationErrors.amountToPay = amountToPayValid ? '' : 'Belum Memilih Hutang';
				
				if(PaymentType==='P'){
					PaymentIsValid = value.length == 1 || value.length == 0;
					console.log(PaymentIsValid);
					fieldValidationErrors.amountToPay = PaymentIsValid ? '' : 'Hutang yang dibayarkan tidak boleh lebih dari 1 untuk pembayaran parsial';
					
					if(!PaymentIsValid){
						this.showAlertError(fieldValidationErrors.amountToPay);
						this.setState({
							paymentReadOnly:true
						});
					}else{
						this.setState({
							paymentReadOnly:false
						});
					}
				}else{
					this.setState({
						paymentReadOnly:true
					});
				}

				if(amountToPayValid < 0){
					this.showAlertError(fieldValidationErrors.amountToPay);
				}

				break;
			case 'selectedJurnal':				
				
				arr_jurnal.push(value);
				this.setState({ jurnal_validasi:arr_jurnal});
				selectedJurnalValid = arr_jurnal.length > 1;
				// selectedJurnalValid = value > 0;
				fieldValidationErrors.selectedJurnal = selectedJurnalValid ? '' : 'Pastikan Jurnal telah dilengkapi';
				// console.log(arr_jurnal.length);
				if(arr_jurnal.length < 2){
					this.showAlertError(fieldValidationErrors.selectedJurnal);					
				}
				break;

			default:
			break;
		}

		this.setState({
			formErrors:fieldValidationErrors,
			selectedSupplierValid:selectedSupplierValid,
			amountToPayValid:amountToPayValid,
			selectedJurnalValid:selectedJurnalValid
		},this.validateForm);
	}

	validateForm(){
		this.setState({
			formValid:this.state.selectedSupplierValid && this.state.amountToPayValid && this.state.selectedJurnalValid
		});
	}

	errorClass(error) {
	   return(error.length === 0 ? '' : 'has-error');
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

	_onChangeCheckboxHutang(e){

		let amount_to_pay = this.state.amount_to_pay.slice();
		let key_value_hutang = { 'idinvo': e.target.id, 'hutang': parseFloat(e.target.value) };
		// Object.keys = mengambil key prop dari object & mengembalikan sebagai array. ex:['idinvo','hutang']
		let keys = Object.keys(key_value_hutang);
		
		// keterangan 1 & 2
		let keterangan1 = this.state.keterangan1.slice(); 
		let keterangan2 = this.state.keterangan2.slice();
		let ket1 = this.state.ketera;
		let ket2 =  'NOINVO : ' + e.target.attributes.getNamedItem('data-noinvo').value;
		let ket1_value = { 'idinvo':e.target.id,'ketera': ket1 };
		let ket2_value = { 'idinvo':e.target.id,'ketera': ket2 };

		// jika hutang dipick (checked)
		if(e.target.checked){

			amount_to_pay.push(key_value_hutang);
			let total_amount_display = amount_to_pay.reduce((prev,next) => prev + next.hutang,0);

			keterangan1.push(ket1_value);
			keterangan2.push(ket2_value);

			this.setState({
				amount_to_pay :amount_to_pay,
				total_amount_display:total_amount_display,
				keterangan1:keterangan1,
				keterangan2:keterangan2
			},()=>{ this.validateField('amountToPay',amount_to_pay) });
		
		}else{
			// jika hutang batal pick (unchecked)
			amount_to_pay.splice(
				//Get the index of the first element in the array that has a value
				amount_to_pay.findIndex((obj)=>{
					return keys.every( (k)=>{ return key_value_hutang[k] === obj[k]; } )
			}),1);

			let total_amount_display = amount_to_pay.reduce((prev,next) => prev + next.hutang,0);

			keterangan1 = keterangan1.filter(function(el){
				return el.idinvo !== e.target.id
			});

			keterangan2 = keterangan2.filter(function(el){
				return el.idinvo !== e.target.id
			});

			this.setState({
				amount_to_pay : amount_to_pay,
				total_amount_display : total_amount_display,
				keterangan1:keterangan1,
				keterangan2:keterangan2
			},()=>{ this.validateField('amountToPay',amount_to_pay) });

		}
	}

	handleChange(date,whatdate) {
		this.setState({ [whatdate]:date });
	}

	handleFilterchange(e){
		this.setState({ filterKeyword:e.target.value.substr(0,20) });
	}

	handleketerangan(e,what){
		//console.log(`e : ${e.target.value} , what : ${what}`);
		this.setState({ [what]:e.target.value });
	}

	handleSubmit(e){

		e.preventDefault();
		
		let userid = this.state.userid;
		let idprsh = this.state.idprsh;
		let idtran = 5;		
		let idsupl = this.state.selectedSupplier.value;// S060
		let tginpt = moment().format('YYYY-MM-DD');
		let tgltra = this.state.tgltra.format('YYYY-MM-DD');
		let tgleff = this.state.tgleff.format('YYYY-MM-DD');
		let keterangan1 = this.state.keterangan1;
		let keterangan2 = this.state.keterangan2;
		let jumtra = this.state.amount_to_pay;
		let flotor = 'T';
		let idotor = 0;
		
		var master = [];
		var ketera = [];

		var obj = {
			idprsh:idprsh,
			idtran:idtran,
			idinpt:userid,			
			tginpt:tginpt,
			tgltra:tgltra,
			tgleff:tgleff,			
			// jmtran:jumtra,
			flotor:flotor,
			idotor:idotor,
			tgotor:null,
			idsupl:idsupl
			// idhtus:idhtus
		};

		var obj2 = {
			ketera1:keterangan1,
			ketera2:keterangan2,
		}

		master.push(obj);
		ketera.push(obj2);

		var _this = this;

		axios.post(`http://${config.server}:${config.port}/${config.nmprsh}/hutang/supplier/payment/${idsupl}`,{
			master: master,
			jumtra: jumtra,
			ketera: this.state.keterangan1,
			ketera2: this.state.keterangan2,
			accounts: this.state.selected_accounts

		}).then(function (response){
			console.log(response);
			_this.showSuccessSave(response.data);			
		}).catch(function (err){
			console.log(err);
		});
	}	

	_onChangeJurnal(e,val,event){

		// console.log(e);//kodacc
		// console.log(event);//object value
		// console.log(val);// props id
				
		let obj = { 'id': val, 'val': event.value, 'kodacc': e };
		let selacc = this.state.selected_accounts.concat();	
		
		// return array tanpa object obj
		selacc = selacc.filter(function(el){
			return el.id !== val
		});

		/// input ke array value obj baru
		selacc.push(obj);

		// sort asc by key id 
		selacc.sort(function (a, b) { return a.id - b.id; });

		this.setState({ selected_accounts:selacc },()=>{ this.validateField('selectedJurnal',event.value) });
		
	}

	onChangeTipe(e){
		console.log(`console log dari parent ${e.target.value}`);
		this.setState({
			selectedTipe:e.target.value
		})
	}

	onChangeAmount(e){
		//console.log(`console log onChangeAmount ${e.target.value}`);

		function changeNilaiHutang(array, newValue ) {
	   		for (var i in array) {
		     // if (array[i].value == value) {
		        array[i].hutang = newValue;
		        break; //Stop this loop, we found it!
		     // }
		   }
		}


		let amount_to_pay = this.state.amount_to_pay.slice();
		//amount_to_pay["hutang"] = e.target.value.replace(/(\d+),(?=[\d,]*\.\d{2}\b)/g, "$1");
		// remove comma from thousand separator
		changeNilaiHutang(amount_to_pay,e.target.value.replace(/(\d+),(?=[\d,]*\.\d{2}\b)/g, "$1"));
		let total_amount_display = amount_to_pay.reduce((prev,next) => prev + next.hutang,0);

		this.setState({
				amount_to_pay :amount_to_pay,
				total_amount_display:total_amount_display
		});

		// console.log("console log amount_to_pay : " + amount_to_pay[0].hutang);
		// amount_to_pay.push(e.target.value);

		console.log("console log total_amount_display : " + total_amount_display);

		

	}

	render(){

		const filterHutang = this.state.data_hutang_supplier.filter((keyword)=>{ return keyword.NOINVO.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1; })

		return(
		<PageLoader loaded={this.state.isPageLoaded}>		
			<div className="row">
				<form action="" className="form-horizontal">
					
					<div className="form-group">
						<br/><br/>
						{/*(this.state.formValid ? '' : <div className="col-sm-8 col-sm-offset-1">
			 					<FormErrors formErrors={this.state.formErrors} />
							</div>)*/}

						<AlertContainer ref={ a => this.msg = a } {...this.alertOptions} />					
					</div>

					<div className={`form-group ${this.errorClass(this.state.formErrors.selectedSupplier)}`}>								
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >SUPPLIER</label>
						<div className="col-sm-4">									
							<Select name="selectedSupplier" isLoading={this.state.isLoadingSupplierData} options = { this.state.data_supplier } value = { this.state.selectedSupplier } onChange = { this._onChangeSupplier.bind(this) } clearable = { false } />
						</div>
					</div>

					<div className="form-group">
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >TIPE PEMBAYARAN</label>
						<div className="col-sm-4">
							<TipePembayaran id={1} onChangeTipe={this.onChangeTipe.bind(this)} selectedOption={this.state.selectedTipe} />
						</div>
					</div>
					
					<div className={`form-group ${this.errorClass(this.state.formErrors.amountToPay)}`}>							
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >INVOICE</label>
						<div className="col-sm-7" style={{ maxHeight:200,overflow:'auto' }} >
							<table className="table table-bordered table-hover font-size-12">
								<thead>
									<tr>
										<th>NO</th>
										<th>NO INVOICE</th>
										<th>TGL INVOICE</th>
										<th>OUTSTANDING</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody>
								{filterHutang.map((hutang)=>{
									return (
										<tr key={hutang.IDINVO}>
											<td>{hutang.IDINVO}</td>
											<td>{hutang.NOINVO}</td>											
											<td>{moment(hutang.TGINVO).format('DD/MM/YYYY')}</td>
											<td className="text-right"><NumberFormat displayType={'text'} value={hutang.NILTOT-hutang.TOTBYR} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} /> </td>
											<td><input name="selectedHutang" type="checkbox" id={ hutang.IDINVO } data-noinvo={ hutang.NOINVO } value = { hutang.NILTOT-hutang.TOTBYR } onChange={this._onChangeCheckboxHutang.bind(this)} /></td>
										</tr>
									)
								})}											
								</tbody>
							</table>
						</div>
					</div>
				
					<div className="form-group">
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >NILAI PEMBAYARAN</label>
						<div className="col-sm-3">									
							<NumberFormat name="amountToPay" displayType={'input'} onChange={this.onChangeAmount.bind(this)} value={this.state.total_amount_display} readOnly={this.state.paymentReadOnly} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl"/>
						</div>								
					</div>
					
					<div className="form-group">
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >TANGGAL</label>
						<div className="col-sm-2">									
							<DatePicker selected={this.state.tgltra} maxDate={moment().add(0, "days")} dateFormat="DD/MM/YYYY" onChange={ (e) => this.handleChange(e,'tgltra')} className="form-control input-sm"/>
						</div>
						<div className="col-sm-2">									
							<DatePicker selected={this.state.tgleff} dateFormat="DD/MM/YYYY" maxDate={moment().add(0, "days")} onChange={ (e) => this.handleChange(e,'tgleff')} className="form-control input-sm"/>
						</div>								
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >KETERANGAN</label>
						<div className="col-sm-5">
							<input type="text" value={this.state.ketera} onChange={(e)=> this.handleketerangan(e,'ketera')} className="form-control input-sm" placeholder="Keterangan"/>
						</div>																
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2 col-sm-offset-1"></label>
						<div className="col-sm-5">
							<input type="text" value={this.state.ketera2} onChange={(e)=> this.handleketerangan(e,'ketera2')} className="form-control input-sm" placeholder="Keterangan Tambahan"/>
						</div>																
					</div>							
					{
						this.state.jurnal_standar.map((jurnal)=>{
							return (								
								<div className={`form-group ${this.errorClass(this.state.formErrors.selectedJurnal)}`} key={jurnal.ID}>
									<label className="control-label col-sm-2 col-sm-offset-1" style={{ fontSize:12 }} >{jurnal.KETERA}</label>
									<div className="col-sm-4">

										<AkunJurnal 
											name="selectedJurnal" 
											id={jurnal.ID} 
											onChangeJurnal={ this._onChangeJurnal.bind( this, jurnal.KODACC ) } />
																										
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
					<div className="form-group">
						<div className="col-sm-4 col-sm-offset-3"><hr/></div>
					</div>						
					<div className="form-group">
						<div className="col-sm-4 col-sm-offset-3">
							<button type="reset" className="btn btn-sm btn-default">Batal</button>&nbsp;&nbsp;
							<input type="submit" disabled={!this.state.formValid} className="btn btn-sm btn-success" onClick={this.handleSubmit.bind(this)} value="Simpan Transaksi"/>
						</div>
					</div>
				</form>
			</div>
		</PageLoader>
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
	
	/*componentWillReceiveProps(newProps){
		this.fetchData(this.props.id);
	}*/

	componentDidMount(){
		this.fetchData(this.props.id);	
	}

	fetchData(id){

		var _this = this;
		var sel = this.state.selectValue.slice();
		sel.push(id);

		axios.get(`http://${config.server}:${config.port}/yfd/data/akun_jurnal_standar/${5}/${id}`)
		.then(function (response){
			_this.setState({
				akun_jurnal_standar:response.data,
				selectValue:sel
			})
		}).catch(function (err) {
			console.log(err);
		});			

	}	

	_onChangeJurnal(e,val){

		var sel = this.state.selectValue.slice();
		sel[e] = val.value;
		// pass to parent
		this.props.onChangeJurnal(e,val);
		this.setState({ selectValue: sel });
	}

	render(){
		return (
			
			<Select name="akun_jurnal_standar" options = { this.state.akun_jurnal_standar } value = { this.state.selectValue[this.props.id] }
				onChange = { this._onChangeJurnal.bind(this,this.props.id)} clearable = { false } ></Select>
			
		);
	}
	// .bind(this,this.props.id) 
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
					<input type="radio" name={`flacct${this.props.id}`} defaultValue={this.state.selectedOption[this.props.id]} checked={this.state.selectedOption[this.props.id] === 'D'} />D</label>
			    <label className="radio-inline">
			    	<input type="radio" name={`flacct${this.props.id}`} defaultValue={this.state.selectedOption[this.props.id]} checked={this.state.selectedOption[this.props.id] === 'K'} />K</label>
			</div>
		);
	}

}

class TipePembayaran extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	selectedOption: 'F'  	
	  };
	}

	onChangeTipe(e){

		this.props.onChangeTipe(e);
		this.setState({
			selectedOption:e.target.value
		});
		//console.log(e.target.value);
	}

	render(){
		return (
			<div>
				<label className="radio-inline">
					<input type="radio" name={`tipebayar${this.props.id}`} value='P' checked={this.props.selectedOption === 'P'} onChange={this.props.onChangeTipe.bind(this)} />Parsial</label>
			    <label className="radio-inline">
			    	<input type="radio" name={`tipebayar${this.props.id}`} value='F' checked={this.props.selectedOption === 'F'} onChange={this.props.onChangeTipe.bind(this)} />Full Payment</label>
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
		//console.log(`e target value : ${e.target.value}`)
	}

	render(){
		//value={this.state.nilai[this.props.id]} 
		return(
			<NumberFormat displayType={'input'} value={this.props.val} onChange={this.handleChange.bind(this)}
				readOnly={true} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} className="form-control input-sm" dir="rtl" />
			
		);
	}
}