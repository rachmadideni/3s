import React from 'react';

class SupplierSparePart extends React.Component {
	render(){
		return (
			<div>
				<h4 className="page-title">Supplier Sparepart</h4>
				<small>Lorem ipsum dolor sit amet.</small>	
				<hr/>
				<div className="row">
					<form action="" className="form-horizontal">
						<div className="form-group">
							<label className="control-label col-sm-2">Tipe Supplier</label>
							<div className="col-sm-4">
								<select name="" id="" className="form-control"></select>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-2">Nama</label>
							<div className="col-sm-4">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-2">Alamat</label>
							<div className="col-sm-8">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-2">Provinsi</label>
							<div className="col-sm-4">
								<select name="" id="" className="form-control"></select>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-2">Kota/Kabupaten</label>
							<div className="col-sm-4">
								<select name="" id="" className="form-control"></select>
							</div>
						</div>
						<div className="form-group">
							<label className="control-label col-sm-2">Nomor Telpon</label>
							<div className="col-sm-3">
								<input type="text" className="form-control input-sm"/>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export { SupplierSparePart };