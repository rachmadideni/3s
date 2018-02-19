import React, { Component } from 'react';
//import React, { Component, Children, PropTypes, cloneElement } from 'react';
import axios from 'axios';

// import SelectCheckbox from '../components/SelectCheckbox/index';

//http://localhost:3001/yfd/data/jenis_transaksi

export default class SettingJurnal extends Component {
	
	constructor(props) {
	  super(props);	
	  this.state = {

	  	jenis_transaksi:[],
	  	akun_jurnal:[],
	  	filterKeyword:"",
	  	selectedOption:''

	  };
	}

	componentWillMount(){

		var _this = this;
		

		axios.get('http://localhost:3001/yfd/data/jenis_transaksi')
		.then(function (response) {
			console.log(response);
			_this.setState({
				jenis_transaksi : response.data
			});
		}).catch(function (err) {
			console.log(err);
		});

		axios.get('http://localhost:3001/yfd/data/akun_jurnal')
		.then(function (response) {
			console.log(response);
			_this.setState({
				akun_jurnal : response.data
			});
		}).catch(function (err) {
			console.log(err);
		});


	}

	handleOptionChange(e) {

	console.log(e.target.value);
	  this.setState({
	    selectedOption: e.target.value
	  });
	}

	render(){

		const filterTransaksi = this.state.jenis_transaksi.filter((keyword)=>{
			return keyword.JNTRAN.toLowerCase().indexOf(this.state.filterKeyword.toLowerCase()) !== -1;
		})

		return(
			<div className="container">
				<div className="page-title">
					<h5>Setting Jurnal Standar</h5>
				</div>
				<div className="row">
					<div className="col-md-12">
						<form action="" className="form-horizontal">							
															
							<div className="form-group">
								<label htmlFor="" className="control-label col-sm-3">Jenis Transaksi</label>
								<div className="col-sm-8 " style={{ maxHeight:350,overflow:'auto' }}>
									<table width="100%" className="table table-bordered table-hover font-size-10">
									<thead>
										<tr>												
											<th width="6%">Id</th>
											<th>Jenis Transaksi</th>												
											<th>action</th>
										</tr>
									</thead>
									<tbody>
									{filterTransaksi.map((transaksi)=>{
										return (
											<tr key={transaksi.IDTRAN}>
												<td>{transaksi.IDTRAN}</td>
												<td>{transaksi.JNTRAN}</td>																										
												<td>
													<input type="radio" value={transaksi.IDTRAN} checked={this.state.selectedOption == transaksi.IDTRAN } onChange={this.handleOptionChange.bind(this)} />
												</td>	
											</tr>
										)
									})}											
									</tbody>
								</table>
								</div>
							</div>

							<hr/>

							<div className="form-group">
								<label htmlFor="" className="control-label col-sm-3">Data Jurnal</label>
								<div className="col-sm-3"></div>
								<div className="col-sm-3"></div>
								<div className="col-sm-3"></div>
							</div>

							<div className="form-group">
								
								<div className="col-sm-9 col-sm-offset-2">
									<table className="table">
										<thead>
											<tr>
												<th>Keterangan</th>
												<th>Akun</th>
												<th>Posisi</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Rekening Pencairan</td>
												<td>all akun kas bank,all akun hutang bank,all akun hutang bank,all akun hutang bank,all akun hutang bank</td>
												<td>Debet</td>
												<td><button>edit</button></td>
											</tr>
											<tr>
												<td>Hutang Bank</td>
												<td>all akun hutang bank</td>
												<td>Kredit</td>
												<td><button>edit</button></td>
											</tr>
										</tbody>
									</table>
								</div>
								
							</div>

							<div className="form-group">
								<label htmlFor="" className="control-label col-sm-2"></label>
								<div className="col-sm-3 pull-right">
									<button type="submit" className="btn btn-sm btn-success">Tambah Jurnal</button>
								</div>
							</div>



							<hr/>

							<div className="form-group">
								<label className="col-sm-3 control-label">Tambah Jurnal</label>
								<div className="col-sm-3">Keterangan</div>
								<div className="col-sm-3">akun</div>
								<div className="col-sm-3">Pos</div>								
							</div>

							<div className="form-group">
								<label htmlFor="" className="control-label col-sm-3"></label>
								<div className="col-sm-3">
									<input type="text" className="form-control input-sm"/>
								</div>
								<div className="col-sm-3" style={{ maxHeight:200,overflow:'auto' }}>
									<table width="100%" className="table table-bordered table-hover font-size-10">
									<thead>
										<tr>												
											<th width="6%">kode</th>																							
											<th>akun</th>
											<th>action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>100</td>
											<td>semua akun kas</td>
											<td>
												<input type="checkbox"/>
											</td>
										</tr>
										<tr>
											<td>110</td>
											<td>semua akun Bank</td>
											<td>
												<input type="checkbox"/>
											</td>
										</tr>
										<tr>
											<td>100</td>
											<td>akun kas</td>
											<td>
												<input type="checkbox"/>
											</td>
										</tr>
										<tr>
											<td>100</td>
											<td>akun kas</td>
											<td>
												<input type="checkbox"/>
											</td>
										</tr>
										<tr>
											<td>100</td>
											<td>akun kas</td>
											<td>
												<input type="checkbox"/>
											</td>
										</tr>
									</tbody>
									</table>
								</div>
								<div className="col-sm-3">									
									<label className="radio-inline">
								      <input type="radio" name="optradio" />Debet
								    </label>
								    <label className="radio-inline">
								      <input type="radio" name="optradio" />Kredit
								    </label>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-3 col-sm-offset-3">
									<button type="submit" className="btn btn-sm btn-success">Simpan</button>
								</div>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		);
	}
}