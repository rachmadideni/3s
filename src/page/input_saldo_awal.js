import React,{Component} from 'react'
import config from '../config'
import axios from 'axios'
import moment from 'moment'
import PageLoader from 'react-loader';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import ReactPaginate from 'react-paginate';
import AlertContainer from 'react-alert';

import ReactModal from 'react-modal';
var NumberFormat = require('react-number-format');


export default class SaldoAwal extends Component{
	
	constructor(props) {
	  super(props);	
	  this.state = {
	  	isThisPageLoaded:false,
	  	dt_saldo_awal:[],
	  	filterKeyword:'',
	  	showModal:false,
	  	idacctForEdit:'',
	  	periode: moment().startOf('year'),
	  };
	}

	componentDidMount(){
		
		var _this = this;
		var periode = '012017';
		console.log(this.state.periode.format('MMYYYY'));

		//let periode = e;
		//var _this = this;
		
		axios.get(`http://${config.server}:${config.port}/yfd/data/coa/saldo/${periode}`)
		.then(function (response){
			// console.log('this handleSearch ',response.data);			
			_this.setState({
				dt_saldo_awal: response.data,
				isThisPageLoaded:true
			})
		}).catch(function (err){
			console.log(err);
		});
		
	}

	onKeywordChange(e){
		// console.log(e.target.value);
		this.setState({ filterKeyword:e.target.value.substr(0,20) });
	}

	handleOpenModal (e) {
		console.log('event dari parent openModal ' + e);
		this.setState({ 
			showModal: true,
			idacctForEdit:e
		});
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	onChangePeriode(date,whatdate) {
		console.log(date);
		this.setState({ [whatdate]:date });
	}

	handleSearch(e){
		e.preventDefault();
		// console.log('periode : ' + e.target.value);
		let periode = e.target.value;
		var _this = this;
		axios.get(`http://${config.server}:${config.port}/yfd/data/coa/saldo/${periode}`)
		.then(function (response){
			// console.log('this handleSearch ',response.data);
			//return response.data
			_this.setState({
				dt_saldo_awal: response.data,
				isThisPageLoaded:true
			})
		}).catch(function (err){
			console.log(err);
		});

	}
	getParent(){
		return document.querySelector('#modalRoot');
	}
	//parentSelector={getParent}

	

	render(){

		const saldo = this.state.dt_saldo_awal.filter((keyword)=>{ 
			return keyword.NMACCI.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1 || 
			keyword.KDACCT.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1; 
		})

		return (
			<PageLoader loaded={this.state.isThisPageLoaded}>
			
					<br/><br/>
					<div className="row">
						<form className="form-horizontal">
							<div className="form-group">				    			
			    				<label className="col-sm-3 col-sm-offset-1 pad25L float-left">Periode (Bulan & Tahun)</label>
				    			<div className="col-sm-4">
				    				<DatePicker selected={this.state.periode} maxDate={moment().add(0,"days")} dateFormat="MM/YYYY" onChange={ (e) => this.onChangePeriode(e,'periode')} className="form-control input-sm"/>
				    			</div>
				    		</div>

				    		<div className="form-group">
			    				<label className="col-sm-3 col-sm-offset-1 pad25L float-left"></label>
				    			<div className="col-sm-4">
				    				<button className="btn btn-md btn-success" value={this.state.periode.format('MMYYYY')} onClick={ this.handleSearch.bind(this) }>Search</button>			    				
				    			</div>
				    		</div>							
							<hr/>
							<div className="form-group">
								<label htmlFor="" className="col-sm-4 pull-right">
									<button className="btn btn-sm btn-info no-border" >
										<i className="glyph-icon icon-cog"></i>&nbsp;&nbsp;Print PDF					
									</button>&nbsp;&nbsp;
									<button className="btn btn-sm btn-success no-border" >
										<i className="glyph-icon icon-file-excel-o"></i>&nbsp;&nbsp;Export Excel					
									</button>
								</label>
							</div>
						</form>
					</div>

				<br/><br/>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						<form action="" className="form-horizontal">
							<div className="form-group">
								<input type="text" className="form-control input-sm" value={this.state.filterKeyword} onChange={this.onKeywordChange.bind(this)} placeholder="filter Account"/>
							</div>
						</form>
					</div>					
				</div>
			
			
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						<table className="table table-condensed table-hover" style={{ fontSize:'11px' }}>
							<thead>
								<tr>								
									<th>Kode</th>
									<th>Akun</th>
									<th>Saldo</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
							{saldo.map((account)=>{
								return (
									<tr key={account.IDACCT}>
										<td>{account.LVLCOA < 4 ? '' : <b>{account.KDACCT}</b> }</td>
										<td>{account.LVLCOA < 4 ? <b>{account.NMACCI}</b> : account.NMACCI }</td>
										<td style={{ textAlign:'right' }}>{
											account.LVLCOA < 4 ? '' : 										
											<NumberFormat displayType={'text'} 
												value={account.SALTOT} 
												thousandSeparator={true} 
												decimalSeparator={'.'} 
												decimalPrecision={2} />
										}</td>
										<td>{
											account.LVLCOA < 4 ? '' :
											<ActionButton id={account.IDACCT} onClick={this.handleOpenModal.bind(this)}/>
										}
										</td>
									</tr>
								)
							})}
							</tbody>						
						</table>
					</div>

				</div>
				<div className="row">

					<div className="col-md-8 col-md-offset-2">
						<ReactModal 
							isOpen={ this.state.showModal } 
							contentLabel="Minimal Modal Example"
							parentSelector={this.getParent.bind(this)}
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
					            }}>
						<span className="pull-right">
							<button className="btn btn-xs btn-warning" onClick={this.handleCloseModal.bind(this)}>Close Modal</button>
						</span>

							<ModalPage 
								idacct={this.state.idacctForEdit} 
								periode={this.state.periode} />				
						</ReactModal>
					</div>
				</div>
			
				
				
			</PageLoader>
		);
	}

}


class ModalPage extends Component {
	constructor(props) {
	  super(props);	
	  this.state = {
	  	akun:[],
	  	// periode: moment().startOf('year'),
	  	saldo:''
	  };
	}

	componentWillReceiveProps(nextProps){
		console.log('next props ' + nextProps.idacct);
	}

	componentDidMount(){
		console.log('this props ' + this.props.periode);
		var _this = this;
		let idacct = this.props.idacct;
		let periode = this.props.periode.format('MMYYYY');

		/*let bulan = periode.substring(0,2);
		let tahun = periode.substring(2);*/

		// data informasi coa
		axios.get(`http://${config.server}:${config.port}/yfd/data/coa/detail/${idacct}`)
		
		.then(function (response){
			// console.log(response.data);
			_this.setState({
				akun : response.data
			})
		}).catch(function (err){
			console.log(err);
		});

		// data saldo
		axios.get(`http://${config.server}:${config.port}/yfd/data/coa/saldo/${idacct}/${periode}`)
		.then(function (response){
			console.log(response.data);
			_this.setState({
				saldo:response.data
			});
		})
		.catch(function (err){
			console.log(err);
		});
	}

	handleChange(date,whatdate) {
		this.setState({ [whatdate]:date });
	}

	handleSaldo(e){
		console.log(e.target.value);
		this.setState({
			saldo:e.target.value
		})
	}

	onSaveClick(e){
		e.preventDefault();

		// idacct,periode(bulan dan tahun),nilai saldo,
		let idacct = this.props.idacct;
		let periode = this.props.periode.format("MMYYYY");
		let bulan = periode.toString().substring(0,2);
		let tahun = periode.toString().substring(2);
		let saldo = this.state.saldo.replace(/(\d+),(?=[\d,]*\.\d{2}\b)/g, "$1");
		var postdata = [];
		var temp_pos = {
			idacct:idacct,
			bulan:bulan,
			tahun:tahun,
			saldo:saldo
		}

		postdata.push(temp_pos);

		// do api calls
		var _this = this;
		// axios.get(`http://${config.server}:${config.port}/yfd/data/coa/saldo/${periode}`)
		
		axios.get(`http://${config.server}:${config.port}/yfd/data/coa/saldo/cekdata/${idacct}/${periode}`)
		.then(function(response){
			console.log('response stlh cekdata : ',response);
			if(response.data === 0){
				// insert
				return axios.post(`http://${config.server}:${config.port}/yfd/data/coa/saldo/simpan`,{
					postdata:postdata
				})							
			}else if(response.data === 1 ){
				//  update
				return axios.post(`http://${config.server}:${config.port}/yfd/data/coa/saldo/update`,{
					postdata:postdata
				});
			}else{
				return axios.post(`http://${config.server}:${config.port}/yfd/data/coa/saldo/reset`,{
					postdata:postdata
				});
			}
		})
		.then(function(response){
			console.log('response stlh return : ',response);
			_this.showSuccessSave(response.data);
		}).catch(function (err){
			console.log(err);
		});
		
		/*axios.post(`http://${config.server}:${config.port}/yfd/data/coa/saldo/simpan`,{
			postdata: postdata			
		}).then(function (response){
			console.log(response);
			_this.showSuccessSave(response.data);

		}).catch(function (err){
			console.log(err);
		});*/


		// console.log(postdata);


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

	render(){

		const akun = this.state.akun;

		return (
			<div className="container">
				<div className="col-md-8">
					<div className="panel">
						<div className="panel-title"><h4>Setting Saldo Awal</h4></div>
						<div className="panel-body">
							<AlertContainer ref={ a => this.msg = a } {...this.alertOptions} />
							<form action="" className="form-horizontal">
								{akun.map((akun)=>{
									return (
									<div key={akun.IDACCT}>
										<div className="form-group">
											<label className="col-sm-3 col-sm-offset-1">Kode Akun</label>
											<label className="col-sm-4">{akun.KDACCT}</label>							
										</div>
										<div className="form-group">
											<label className="col-sm-3 col-sm-offset-1">Nama Akun</label>
											<label className="col-sm-4">{akun.NMACCI}</label>							
										</div>
										<div className="form-group">
					                        <label className="col-sm-3 col-sm-offset-1">Flag Kas</label>
					                        <label className="col-sm-4">{akun.FLGKAS === 'Y' ? 'KAS' : 'NON KAS'}</label>                        
					                    </div>
					                    <div className="form-group">
					                        <label className="col-sm-3 col-sm-offset-1">Flag Budget</label>
					                        <label className="col-sm-4">{akun.FLBUDG === 'Y' ? 'BUDGET' : 'NON BUDGET'}</label>                        
					                    </div>
					                    <div className="form-group">
					                        <label className="col-sm-3 col-sm-offset-1">Saldo Normal</label>
					                        <label className="col-sm-4">{akun.FLACCT === 'D' ? 'DEBET' : 'KREDIT'}</label>                        
					                    </div>
					                    <div className="form-group">
					                        <label className="col-sm-3 col-sm-offset-1">Status Akun</label>
					                        <label className="col-sm-4">{akun.FAKTIF === 'Y' ? 'AKTIF' : 'TIDAK AKTIF'}</label>                        
					                    </div>
					                </div>
					                )})
					            }
					            <div className="form-group">
			                        <label className="col-sm-3 col-sm-offset-1">Periode</label>
			                        <label className="col-sm-3">
			                       
			                    		{/*moment().add(0, "days")*/}
			                        	<DatePicker readOnly={true} disabled={true} selected={this.props.periode} maxDate={moment().startOf('year')} dateFormat="MM/YYYY" onChange={ (e) => this.handleChange(e,'periode')} className="form-control input-sm"/>
			                        </label>
			                    </div>
					            <div className="form-group">
			                        <label className="col-sm-3 col-sm-offset-1">Saldo</label>
			                        <label className="col-sm-3">
			                        	<NumberFormat 
			                        		displayType={'input'}
			                        		value={this.state.saldo} 
			                        		readOnly={false} 
			                        		thousandSeparator={true} 
			                        		decimalSeparator={'.'} 
			                        		decimalPrecision={2} className="form-control input-sm" dir="rtl" onChange={this.handleSaldo.bind(this)}/>
			                        </label>                        
			                    </div>
			                    <div className="form-group">
			                    	<label className="col-sm-3 col-sm-offset-1"></label>
			                    	<label className="col-sm-3">
			                    		<button className="btn btn-sm btn-success" onClick={this.onSaveClick.bind(this)}>Simpan</button>
			                    	</label>
			                    </div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ActionButton extends Component{
	componentDidMount(){

	}

	onClickButton(e){
		//console.log(e.target.value);
		this.props.onClick(e.target.value);
	}

	render(){
		return (
			<button className="btn btn-xs btn-success" value={this.props.id} onClick={this.onClickButton.bind(this)}>SETTING SALDO</button>
		);
	}
}