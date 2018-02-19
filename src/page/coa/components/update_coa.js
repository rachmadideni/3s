import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import NUmberFormat from 'react-number-format';
import AlertContainer from 'react-alert';

class ParentSelector extends Component {
	constructor(props) {
	  super(props);	
	  this.state = {
	  	ds:[]
	  };
	}

	componentDidMount(){
		// this.props.idprnt
		// this.props.ds
		// this.props.typeId
		// console.log(this.props.match.params.idacct);
		//console.log(this.props.typeId);
		var _this = this;

		var idprnt = this.props.idprnt;
		axios.get(`http://localhost:3004/balian/coa/list`)
		.then(function (response){						
			_this.setState({
				ds: response.data
			});
			//console.log(response.data);
		}).catch(function (err){
			console.log(err);
		});


	}

	/*componentWillReceiveProps(nextProps){
		var _this = this;
	    console.log(nextProps);
	    _this.setState({ selectedParent: parseInt(nextProps.value)})
	}*/

	

	onChangeParent = (e) => {
		// console.log(typeId);
		this.props.onChangeParent(e);
	}

	render(){
		return (
			<Select placeholder="Pilih Grup Rekening" clearable={false} value={this.props.value} options = { this.state.ds } onChange={this.onChangeParent} />
		);
	}
}

export default class UpdateCoa extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	val1 : '0',	  	
	  	selectedParent:'0',
	  	idacct:'',
	  	lvlcoa:'',
	  	idklas:'',
	  	kdacct:'',
	  	nmacci:'',
	  	flbudg:'T',
	  	flgkas:'T',
	  	flacct:'D',
	  	mapkhs:'T',
	  	mapkhs_jenis:'',
	  	mapkhs_jenis_khusus:'',
	  	mapkhs_jenis_detail:'',
	  	list_jenis_detail:[],
	  	list_jenis_khusus_piutang:[
		  	{
		  		"label":"Piutang Direksi",
		  		"value":"PD"
		  	},
		  	{
		  		"label":"Piutang Karyawan",
		  		"value":"PK"
		  	},
		  	{
		  		"label":"Piutang Afiliasi",
		  		"value":"PA"
		  	},
		  	{
		  		"label":"Piutang Usaha",
		  		"value":"PU"
		  	}
	  	],
	  	list_jenis_khusus_hutang:[
		  	{
		  		"label":"hutang Afiliasi",
		  		"value":"HA"
		  	},
		  	{
		  		"label":"Hutang Usaha / Supplier",
		  		"value":"HU"
		  	},
		  	{
		  		"label":"Hutang Bank",
		  		"value":"HB"
		  	},
		  	{
		  		"label":"Hutang Leasing",
		  		"value":"HL"
		  	}
	  	],

	  };
	}

	componentDidMount(){
		//console.log(this.props.match.params.idacct);
		var idacct = this.props.match.params.idacct;
		var _this = this;
		axios.get(`http://localhost:3004/balian/coa/parent/${idacct}`).then(function (response){
			_this.setState({
				idacct:idacct,
				selectedParent:parseInt(response.data[0].IDPRNT),
				kdacct:response.data[0].KDACCT,
				nmacci:response.data[0].NMACCI,
				flgkas:response.data[0].FLGKAS,
				flbudg:response.data[0].FLBUDG,
				mapkhs:response.data[0].MAPKHS,
				lvlcoa:response.data[0].LVLCOA,
				idklas:response.data[0].IDKLAS,
				mapkhs_jenis:response.data[0].JENIS_MAP,
				mapkhs_jenis_khusus:response.data[0].JENIS_KHUSUS,
				mapkhs_jenis_detail:response.data[0].JENIS_DETAIL
			},()=>{ _this.mapdetail(response.data[0].JENIS_KHUSUS) });
		});

		

	}

	mapdetail(mapkhs_jenis_khusus){
		var _this = this;
		// var mapkhs_jenis_khusus = this.state.mapkhs_jenis_khusus;
		//var mapkhs_jenis_khusus = 'HU';
		axios.get(`http://localhost:3004/balian/coa/list/mapdetail/${mapkhs_jenis_khusus}`)
		.then(function (response){						
			_this.setState({
				list_jenis_detail: response.data				
			});
			//console.log(response.data);
		}).catch(function (err){
			console.log(err);
		});
	}

	componentWillReceiveProps(nextProps){
		var _this = this;
	    console.log(nextProps);
	    //this.setState({user: nextProps.user})
		var idacct = nextProps.value;
	    // ambil data coa
		
	}

	handleSelected(e){
		console.log('dari parent : ',e);
		var idacct = e.value;
		var _this = this;

		axios.get(`http://localhost:3004/balian/coa/list/newcode/${idacct}`).then(function (response){						
			// response.data
			_this.setState({
				selectedParent:e.value,
				kdacct: response.data[0].KODE + "-" + response.data[0].NOURUT_BARU,
				lvlcoa: response.data[0].LVLCOA,
				idklas:e.value
			})
			console.log(response.data);
		}).catch(function (err){
			console.log(err);
		});

		/*this.setState({
			selectedParent:e.value
		})*/
	}
	
	// TODO
	_validasiField(namafield,nilai){

	}

	_handleKodeAcct = (e) => {
		this.setState({ kdacct: e.target.value })
	}

	_handleNmacci = (e) => {
		this.setState({ nmacci: e.target.value })	
	}

	_handleFlagBudget = (e) => {
		console.log(e.target.value);
		this.setState({ flbudg: e.target.value })
	}

	_handleFlagKas = (e) => {
		console.log(e.target.value);
		this.setState({ flgkas: e.target.value })
	}

	_handleFlacct = (e) => {
		console.log(e.target.value);
		this.setState({ flacct: e.target.value })	
	}

	_handleMapp = (e) => {
		console.log(e.target.value);
		this.setState({ mapkhs: e.target.value })	
	}

	_handleMapp_Jenis = (e) => {
		console.log(e.target.value);
		this.setState({ mapkhs_jenis: e.target.value })
	}

	_handleMapp_Jenis_Khusus = (e) => {
		console.log(e.value);		
		var _this = this;
		var mapdetail = e.value;		
		axios.get(`http://localhost:3004/balian/coa/list/mapdetail/${mapdetail}`)
		.then(function (response){						
			_this.setState({
				list_jenis_detail: response.data,
				mapkhs_jenis_khusus:e.value
			})
			//console.log(response.data);
		}).catch(function (err){
			console.log(err);
		});

		this.setState({
			mapkhs_jenis_khusus:e.value
		});
	}

	_handleMapp_Jenis_Detail = (e) => {
		console.log(e.value);
		this.setState({
			mapkhs_jenis_detail:e.value
		})
	}

	_handleSubmit = (e) => {

		e.preventDefault();
		let idacct = this.state.idacct;
		let kdacct = this.state.kdacct;
		let nmacci = this.state.nmacci;
		let flgkas = this.state.flgkas;
		let flbudg = this.state.flbudg;
		let flacct = this.state.flacct;
		let idprnt = this.state.selectedParent;
		let lvlcoa = this.state.lvlcoa;
		let idklas = this.state.idklas;
		let mapkhs = this.state.mapkhs;
		let mapkhs_jenis = this.state.mapkhs_jenis;
		let mapkhs_jenis_khusus = this.state.mapkhs_jenis_khusus;
		let mapkhs_jenis_detail = this.state.mapkhs_jenis_detail;

		var coa = [];
		var coa_mapp = [];

		var temp = {
			idacct:idacct,
			kdacct:kdacct,
			nmacci:nmacci.toUpperCase(),
			flgkas:flgkas,
			flbudg:flbudg,
			flacct:flacct,
			idprnt:idprnt,
			lvlcoa:lvlcoa,
			idklas:idklas,
			mapkhs:mapkhs
		}

		var temp2 = {
			mapkhs_jenis:mapkhs_jenis,
			mapkhs_jenis_khusus:mapkhs_jenis_khusus,
			mapkhs_jenis_detail:mapkhs_jenis_detail			
		}

		coa.push(temp);
		coa_mapp.push(temp2);

		var _this = this;

		axios.post(`http://localhost:3004/balian/coa/update`,{
			coa: coa,
			coa_mapp: coa_mapp
		}).then(function (response){
			console.log(response);
			// _this.showSuccessSave(response.data);			
		}).catch(function (err){
			console.log(err);
		});

	}

	render(){

		return (
			<div>
			<h4>Update Rekening</h4>
			<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, vel.</small>
			<div className="row">
				<form action="" className="form-horizontal" onSubmit={this._handleSubmit}>
					<div className="form-group">
						<label className="control-label col-sm-2">Parent</label>
						<div className="col-sm-5">
							<ParentSelector idprnt = { this.state.val1 } value = { this.state.selectedParent } onChangeParent = { this.handleSelected.bind(this) } />							
						</div>
					</div>					
					<div className="form-group">
						<label className="control-label col-sm-2">Kode Rekening</label>
						<div className="col-sm-3">							
							<NUmberFormat value={this.state.kdacct} displayType={'input'} format="###-###" className="form-control input-sm" onChange={this._handleKodeAcct}></NUmberFormat>
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">Nama Rekening</label>
						<div className="col-sm-5">
							<input type="text" className="form-control input-sm" value={this.state.nmacci} onChange={this._handleNmacci}/>
						</div>
					</div>
					<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2">Rekening Budget</label>
					<div className="col-sm-4">						
						<label className="radio-inline">
							<input type="radio" value="Y" name="flbudg" checked={this.state.flbudg === 'Y'} onChange={this._handleFlagBudget} />Ya
						</label>
						<label className="radio-inline">
							<input type="radio" value="T" name="flbudg" checked={this.state.flbudg === 'T'}  onChange={this._handleFlagBudget} />
							Tidak
						</label>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2">Rekening Kas/Bank</label>
					<div className="col-sm-4">
						<label className="radio-inline">
							<input type="radio" value="Y" name="flgkas" checked={this.state.flgkas === 'Y'} onChange={this._handleFlagKas} />Ya
						</label>
						<label className="radio-inline">
							<input type="radio" value="T" name="flgkas" checked={this.state.flgkas === 'T'} onChange={this._handleFlagKas} />
							Tidak
						</label>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2">Saldo Normal</label>
					<div className="col-sm-4">
						<label className="radio-inline">
							<input type="radio" value="D" name="flacct" checked={this.state.flacct === 'D'} onChange={this._handleFlacct} />Debet
						</label>
						<label className="radio-inline">
							<input type="radio" value="K" name="flacct" checked={this.state.flacct === 'K'} onChange={this._handleFlacct} />
							Kredit
						</label>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2">Mapping Khusus</label>
					<div className="col-sm-4">
						<label className="radio-inline">
							<input type="radio" value="Y" name="mapkhs" checked={this.state.mapkhs === 'Y'} onChange={this._handleMapp} />Ya
						</label>
						<label className="radio-inline">
							<input type="radio" value="T" name="mapkhs" checked={this.state.mapkhs === 'T'} onChange={this._handleMapp} />
							Tidak
						</label>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2"></label>
					<div className="col-sm-4">
						<label className="radio-inline">
							<input type="radio" value="P" disabled={this.state.mapkhs === 'T' ? true : false } name="mapkhs_jenis" checked={this.state.mapkhs_jenis === 'P'} onChange={this._handleMapp_Jenis} />Piutang
						</label>
						<label className="radio-inline">
							<input type="radio" value="H" disabled={this.state.mapkhs === 'T' ? true : false } name="mapkhs_jenis" checked={this.state.mapkhs_jenis === 'H'} onChange={this._handleMapp_Jenis} />Hutang
						</label>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2"></label>
					<div className="col-sm-5">
						<Select placeholder="Jenis mapping"
							disabled={this.state.mapkhs === 'T' ? true : false }  
							clearable={false} 
							value={this.state.mapkhs_jenis_khusus} 
							options = { this.state.mapkhs_jenis === 'P' ? this.state.list_jenis_khusus_piutang : this.state.list_jenis_khusus_hutang } 
							onChange={this._handleMapp_Jenis_Khusus} />
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2"></label>
					<div className="col-sm-5">
						<Select placeholder="Jenis mapping"
							disabled={this.state.mapkhs === 'T' ? true : false }  
							clearable={false} 
							value={this.state.mapkhs_jenis_detail} 
							options = { this.state.list_jenis_detail } 
							onChange={this._handleMapp_Jenis_Detail} />
					</div>
				</div>				

				<div className="form-group">
					<label htmlFor="" className="control-label col-sm-2"></label>
					<div className="col-sm-4">
						<input type="submit" className="btn btn-sm btn-success" value="simpan"/>&nbsp;&nbsp;
						<input type="reset" className="btn btn-sm btn-cancel" value="cancel"/>
					</div>
				</div>

				</form>
			</div>
			</div>

		);
	}
}