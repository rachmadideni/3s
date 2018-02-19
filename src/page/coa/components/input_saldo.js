import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
var NumberFormat = require('react-number-format');

export default class InputSaldo extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	idacct:0,
	  	periode: moment().startOf('year'),
	  	saldo:0,
	  	akun:[]
	  };
	}

	componentDidMount(){
		var _this = this;
		var idacct = this.props.match.params.idacct;

		axios.get(`http://localhost:3004/balian/coa/detail/${idacct}`)		
		.then(function (response){
			console.log(response.data);
			_this.setState({
				idacct: idacct,
				akun : response.data,
				saldo: response.data[0].SALTOT,
				
			})
		}).catch(function (err){
			console.log(err);
		});
		//periode:response.data[0].PERIODE
	}

	onChangePeriode(date,whatdate) {
		console.log(date);
		this.setState({ [whatdate]:date });
	}

	handleSaldo(e){
		console.log(e.target.value);
		this.setState({
			saldo:e.target.value
		})
	}

	_handleSubmit = (e) => {
		
		e.preventDefault();
		
		var _this = this;
		let idacct = this.state.idacct;
		let periode = this.state.periode.format("MMYYYY");
		let bulan = periode.toString().substring(0,2);
		let tahun = periode.toString().substring(2);
		let saldo = this.state.saldo.replace(/(\d+),(?=[\d,]*\.\d{2}\b)/g, "$1");

		var postdata = [];
		var temp = {
			idacct:idacct,
			bulan:bulan,
			tahun:tahun,
			saldo:saldo

		}

		postdata.push(temp);

		axios.get(`http://localhost:3004/balian/data/coa/saldo/cekdata/${idacct}/${periode}`)
		.then(function(response){
			console.log('response stlh cekdata : ',response);
			if(response.data === 0){
				// insert
				return axios.post(`http://localhost:3004/balian/data/coa/saldo/simpan`,{
					postdata:postdata
				})							
			}else if(response.data === 1 ){
				//  update
				return axios.post(`http://localhost:3004/balian/data/coa/saldo/update`,{
					postdata:postdata
				});
			}else{
				return axios.post(`http://localhost:3004/balian/data/coa/saldo/reset`,{
					postdata:postdata
				});
			}
		})
		.then(function(response){
			console.log('response stlh return : ',response);
			//_this.showSuccessSave(response.data);
		}).catch(function (err){
			console.log(err);
		});

	}

	render(){
		const akun = this.state.akun; 
		return (
			<div>
			<h4>Setting Saldo</h4>
			<small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, vel.</small>
			<div className="row">
				<form action="" className="form-horizontal" onSubmit={this._handleSubmit}>
					{akun.map((akun)=>{
						return (
							<div className="form-group">
								<label className="control-label col-sm-2">Rekening</label>
								<label className="col-sm-3">{akun.NMACCI}</label>
							</div>
						)
					})}
					<div className="form-group">
						<label className="control-label col-sm-2">Periode</label>
						<div className="col-sm-3">
							<DatePicker 
								selected={this.state.periode} 
								maxDate={moment().add(0,"days")} 
								dateFormat="MM/YYYY" 
								onChange={ (e) => this.onChangePeriode(e,'periode')} className="form-control input-sm" />							
						</div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2">AMOUNT</label>
						<div className="col-sm-3">
							<NumberFormat 
                        		displayType={'input'}
                        		value={this.state.saldo} 
                        		readOnly={false} 
                        		thousandSeparator={true} 
                        		decimalSeparator={'.'} 
                        		decimalPrecision={2} className="form-control input-sm" dir="rtl" onChange={this.handleSaldo.bind(this)}/>
			            </div>
					</div>
					<div className="form-group">
						<label className="control-label col-sm-2"></label>
						<div className="col-sm-3">
							<button className="btn btn-sm btn-success">Simpan</button>
						</div>
					</div>
				</form>
			</div>
			</div>
		);
	}
}