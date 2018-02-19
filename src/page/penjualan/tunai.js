import React, { Component } from 'react';

class Tunai extends Component{
	render(){
		return (
			<div>
				<h4 className="page-title">TUNAI</h4>
				<small>Lorem ipsum dolor sit amet.</small>	
				<hr/>
				<div className="row">
					<form action="" className="form-horizontal">
						<div className="form-group">
							<label className="control-label col-sm-3">NAMA CUSTOMER</label>
							<div className="col-sm-3">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-3">ALAMAT</label>
							<div className="col-sm-3">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-3">NO.TELP/NO.HANDPHONE</label>
							<div className="col-sm-3">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
						<div className="form-group">
							<div className="control-label col-sm-3">Merk Motor</div>
							<div className="col-sm-4">
								<div className="input-group">
									<input type="text" className="form-control"/>
									<div className="input-group-btn">
										<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
											More&nbsp;<span className="caret"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="control-label col-sm-3">Tipe Motor</div>
							<div className="col-sm-4">
								<div className="input-group">
									<input type="text" className="form-control"/>
									<div className="input-group-btn">
										<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
											More&nbsp;<span className="caret"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="control-label col-sm-3">Warna</div>
							<div className="col-sm-4">
								<div className="input-group">
									<input type="text" className="form-control"/>
									<div className="input-group-btn">
										<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
											More&nbsp;<span className="caret"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-3">HARGA OTR</label>
							<div className="col-sm-3">
								<input type="text" className="form-control input-sm" dir="rtl"/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export { Tunai };