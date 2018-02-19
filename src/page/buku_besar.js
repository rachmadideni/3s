import React, { Component } from 'react'
import config from '../config'
import axios from 'axios'
import moment from 'moment'
import PageLoader from 'react-loader';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AlertContainer from 'react-alert';
import ReactModal from 'react-modal';
var NumberFormat = require('react-number-format');

export default class BukuBesar extends Component{
	
	constructor(props) {
		super(props);
		this.state = {
			isThisPageLoaded: false,
			periode: moment().startOf('year'),
			tg01: moment(),
			tg02: moment(),
			selectedTipe: '2',
			akun: [],
			akun_selected: '',
			data_buku_besar: [],
			filterKeyword: '',
			saldoAwal:0,
			showModal:false,
			idglac:0
		};
	}

	componentDidMount() {
		var _this = this;
		axios.get(`http://${config.server}:${config.port}/yfd/data/bukubesar/akun`)
			.then(function (response) {
				_this.setState({
					akun: response.data,
					isThisPageLoaded: true
				})
			}).catch(function (err) {
				console.log(err);
			});

	}

	handleSearch(e){
		e.preventDefault();
		let tg01 = this.state.tg01.format("YYYY-MM-DD");
		let tg02 = this.state.tg02.format("YYYY-MM-DD");
		let idacct = this.state.akun_selected.Value;
		let sttran = this.state.selectedTipe;
		
		/*
		var postdata = [];
		var temp = {
			idacct: idacct,
			tg01: tg01,
			tg02: tg02,
			sttran: sttran
		}

		postdata.push(temp);
		*/

		var _this = this;
		///data/bukubesar/daftar/:idacct/:bytagl/:tg01/:tg02/:sttran
		axios.get(`http://${config.server}:${config.port}/yfd/data/bukubesar/daftar/${idacct}/${1}/${tg01}/${tg02}/${sttran}`)
			.then(function (response) {
				console.log(response.data);
				_this.setState({
					data_buku_besar: response.data
				})
			}).catch(function (err) {
				console.log(err);
			})

		// console.log(postdata);
	}

	handleDateChange(date,whatdate) {
		this.setState({ [whatdate]: date });
	}

	onChangeTipe(e) {
		this.setState({
			selectedTipe: e.target.value
		})
	}

	handleChangeAkun(e) {
		//console.log(e.Value);
		this.setState({
			akun_selected: e
		})
	}

	onKeywordChange(e) {
		// console.log(e.target.value);
		this.setState({ filterKeyword: e.target.value.substr(0, 20) });
	}

	handleSaldoAwalMount(e) {
		console.log('saldo awal (p) : ' + e);
		this.setState({
			saldoAwal:e
		})
	}

	_prepareRows(){
		let filteredRows,bukubesar;
		let temp_saldo_awal = this.state.saldoAwal;
		bukubesar = this.state.data_buku_besar
		filteredRows = bukubesar.filter(
			(item)=> item.KETERA.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1 ||
			item.NOTRAN.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1
		)

		return filteredRows.map(
			(item,index)=> this._renderRows(item,temp_saldo_awal)				
		)
	}

	_handleShowModal(e,data){
		console.log(e);
		console.log(data);
		this.setState({
			showModal:!this.state.showModal,
			idglac:e

		})
	}

	_renderRows(item,temp_saldo_awal){
		let no = 0;
		let saldo_akhir = 0;
		if(item.FLACCT === 'K'){
			if(item.DEBET > 0){
				temp_saldo_awal -= item.DEBET 
			}else{
				temp_saldo_awal += item.KREDIT
			}
		}else{
			if(item.DEBET > 0){
				temp_saldo_awal += item.DEBET 
			}else{
				temp_saldo_awal -= item.KREDIT
			}
		}
		return (
			<tr key={item.IDGLAC}>
				<td style={{ textAlign:'center' }}>{no + 1}</td>
				<td style={{ textAlign:'center' }}>
					<a className="btn btn-xs btn-link btn-success" idglac={item.IDGLAC} onClick={this._handleShowModal.bind(this,item.IDGLAC)}>upload</a>&nbsp;
					<a className="btn btn-xs btn-link btn-info">view</a>
				</td>
				<td>{item.NOTRAN}</td>
				<td style={{ textAlign:'center'}}>{moment(item.TGLTRA).format("DD/MM/YYYY")}</td>
				<td style={{ textAlign:'center'}}>{moment(item.TGLEFF).format("DD/MM/YYYY")}</td>
				<td>{item.KETERA}</td>
				<td></td>
				<td style={{ textAlign:'right' }}>											
					<NumberFormat displayType={'text'} value={item.DEBET} thousandSeparator={true} 
					decimalSeparator={'.'} decimalPrecision={2} />
				</td>
				<td style={{ textAlign:'right' }}>
					<NumberFormat displayType={'text'} value={item.KREDIT} thousandSeparator={true} 
					decimalSeparator={'.'} decimalPrecision={2} />
				</td>				
				<td style={{ textAlign:'right' }}>					
					<NumberFormat displayType={'text'} value={temp_saldo_awal} thousandSeparator={true} 
					decimalSeparator={'.'} decimalPrecision={2} />
				</td>
			</tr>
		)
	}

	render(){		

		return (
			<PageLoader loaded={ this.state.isThisPageLoaded }>
				<div className="row">
					<form action="" className="form-horizontal" method="POST">
	            		<div className="form-group">	    			
			    			<label className="col-sm-2 col-sm-offset-1 float-left">Tanggal Awal</label>
			    			<div className="col-sm-2">		    					
		    					<DatePicker selected={this.state.tg01} maxDate={moment().add(0, "days")} dateFormat="DD/MM/YYYY" onChange={ (e) => this.handleDateChange(e,'tg01')} className="form-control input-sm"/>		    						    				
			    			</div>
			    			<label className="col-sm-2 col-sm-offset-1 float-left">Tanggal Akhir</label>
			    			<div className="col-sm-2">
			    				<DatePicker selected={this.state.tg02} maxDate={moment().add(0, "days")} dateFormat="DD/MM/YYYY" onChange={ (e) => this.handleDateChange(e,'tg02')} className="form-control input-sm"/>
			    			</div>			    			
			    		</div>			    		

			    		<div className="form-group">
			    			<label className="col-sm-2 col-sm-offset-1 float-left">Kode Akun</label>
			    			<div className="col-sm-7">			    				
			    				<Akun 
			    					data={this.state.akun} 
			    					selectedValue={this.state.akun_selected} 
			    					ChangeAkun={this.handleChangeAkun.bind(this)} />
			    			</div>
			    		</div>

			    		<div className="form-group">
			    			<label className="col-sm-2 col-sm-offset-1 float-left">Status Transaksi</label>
			    			<div className="col-sm-7">
			    				<StatusTransaksi onChangeTipe={ this.onChangeTipe.bind(this) } selectedOption={ this.state.selectedTipe } />			    					                        
			    			</div>
			    		</div>

			    		<div className="form-group">			    			
			    			<label className="col-sm-2 col-sm-offset-1 float-left"></label>
			    			<div className="col-sm-4">			    				
			    				<button onClick={this.handleSearch.bind(this)} className="btn btn-sm btn-success">PROSES</button>
			    			</div>
			    		</div>

	            	</form>	
				</div>
				<div className="row">
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-sm-3 col-sm-offset-1">
								<input type="text" className="form-control input-sm" value={this.state.filterKeyword} onChange={this.onKeywordChange.bind(this)} placeholder="filter Account"/>
							</div>
							<div className="col-sm-2 col-sm-offset-5">
								<SaldoAWal idacct={31} tg01={this.state.tg01.format("YYYY-MM-DD")} onMount={this.handleSaldoAwalMount.bind(this)}/>
							</div>
						</div>
					</form>
				</div>
				<div className="row">
					<div className="col-sm-10 col-sm-offset-1">
						<table className="table table-bordered" style={{ fontSize:'11px' }}>
						<thead>
							<tr>
								<th className="text-center">NO</th>
								<th className="text-center">ACTION</th>
								<th className="text-center">NO TRAN</th>
								<th className="text-center">TGL TRAN</th>
								<th className="text-center">TGL EFEKTIF</th>
								<th className="text-center">KETERANGAN</th>
								<th className="text-center">REF</th>
								<th className="text-center">DEBET</th>
								<th className="text-center">KREDIT</th>
								<th className="text-center">SALDO</th>
							</tr>									
						</thead>								
						<tbody>				
						{this._prepareRows()}
						</tbody>
						</table>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-7 col-sm-offset-1">
						<ReactModal 
							ariaHideApp={false}
							isOpen={ this.state.showModal } 
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
										zindex						: 90000,
										top                        : '100px',
										left                       : '700px',
										right                      : '40px',
										bottom                     : '120px',
										border                     : '1px solid #ccc',
										background                 : '#fff',
										overflow                   : 'auto',
										WebkitOverflowScrolling    : 'touch',
										borderRadius               : '4px',
										outline                    : 'none',
										padding                    : '20px'

									}
									}}>
							
							<div className="row">
								<div className="col-sm-2 pull-right">
								<span className="pull-right">
									<button className="btn btn-xs btn-warning" onClick={this._handleShowModal.bind(this)}>
										<span className="glyphicon glyphicon-close"></span>Close Modal</button>
								</span>
								</div>
							</div><br/><br/>

							<ModalUpload idglac={this.state.idglac} />
						</ReactModal>
					</div>
				</div>
			</PageLoader>
		);
	}
}

class ModalUpload extends Component{
	constructor(props){
		super(props);
		this.state = {
			file:null
		}
	}

	componentWillReceiveProps(nextProps){
		console.log('next props ' + nextProps.idglac);
	}

	componentDidMount(){
		console.log('modal props : '+ this.props.idglac);
	}

	_onChangeFiles(e){
		console.log(e);
		this.setState({
			file:e.target.files[0]
		})
	}

	_fileUpload(file){

		const url = `http://${config.server}:${config.port}/yfd/data/bukubesar/upload`;
		const formData = new FormData();
		formData.append('myfile',file);
		
		const fconfig = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
    	
		return axios.post(url, formData, fconfig);

	}

	_onFormSubmit(e){
		e.preventDefault();
		this._fileUpload(this.state.file).then((response)=>{
			console.log(response.data);
		})
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
				<form action="" className="form-horizontal" onSubmit={this._onFormSubmit.bind(this)}>
					
					<div className="form-group">
						<label className="col-sm-2 col-sm-offset-1">DOKUMEN</label>
						<div className="col-sm-6">
							<input type="file" name="myfile" className="form-control input-sm" onChange={this._onChangeFiles.bind(this)}/>
						</div>
						<div className="col-sm-2">							
							<input type="submit" value="Upload File" name="submit" className="btn btn-sm btn-info"/>
						</div>
					</div>
				</form>
				</div>
			</div>
		);
	}
}

class SaldoAWal extends Component{
	constructor(props){
		super(props);
		this.state = {
			nilai_saldo:0,
			periode_saldo:'',
			saldo_awal:0
		}
	}	

	async componentDidMount(){

		var _this = this;
		let idacct = this.props.idacct;
		let tg01 = this.props.tg01;		
		
		const step1 = await axios.get(`http://${config.server}:${config.port}/yfd/data/bukubesar/saldoAwalPeriodeTerakhir/${idacct}`);
		
		let periode_saldo = step1.data[0].PERIODE_SALDO;
		const step2 = await axios.get(`http://${config.server}:${config.port}/yfd/data/bukubesar/posisiSaldoAwal/${periode_saldo}/${tg01}/${idacct}`)

		_this.setState({
			nilai_saldo:step1.data[0].NILAI_SALDO,
			periode_saldo:step1.data[0].PERIODE_SALDO
		});
		
		const saldoMutasi = await this.calcSaldoMutasi(step2,this.state.nilai_saldo);
		this.props.onMount(this.state.saldo_awal);
	}

	calcSaldoMutasi(response,saldo){
		// console.log(response.data);
		let data = response.data;
		
		data.map(function (dt) {
			//console.log(dt.JUMTRA)
			if(dt.FLACCT === 'K'){
				if(dt.KODACC === 'D'){
					saldo -= dt.JUMTRA;
				}else{
					saldo += dt.JUMTRA;
				}
			}else{
				if(dt.KODACC === 'D'){
					saldo += dt.JUMTRA;
				}else{
					saldo -= dt.JUMTRA;
				}
			}
		});
		
		this.setState({
			saldo_awal:saldo
		});
		//return saldo;
		// console.log(saldo);
	}

	render(){
		return (
			<div>
				<NumberFormat 
					displayType={'text'} 
					value={this.state.saldo_awal} 
					thousandSeparator={true} 
					decimalSeparator={'.'} 
					decimalPrecision={2} />
			</div>
		);
	}
}

class Akun extends Component{
	render(){
		return (			
			<Select 
				options ={ this.props.data } 
				value={ this.props.selectedValue }
				onChange={this.props.ChangeAkun.bind(this)} 
				clearable={ false } >
			</Select>
		);
	}
}

class StatusTransaksi extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {	  	
	  };
	}

	onChangeTipe(e){
		this.props.onChangeTipe(e);
	}

	render(){
		return (
			<div>
				<label className="radio-inline">
					<input 
						type="radio" 
						value={0} 
						checked={ this.props.selectedOption === '0' } onChange={ this.onChangeTipe.bind(this) } />
						posting
				</label>
			    <label className="radio-inline">
			    	<input type="radio" 
			    		value={1} 
			    		checked={ this.props.selectedOption === '1' } onChange={this.onChangeTipe.bind(this)} />
			    		belum posting
			    </label>
			    <label className="radio-inline">
			    	<input type="radio" 
			    		value={2} 
			    		checked={ this.props.selectedOption === '2' } onChange={this.onChangeTipe.bind(this)} />
			    		All
			    </label>
			</div>
		);
	}
}