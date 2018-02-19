import React from 'react';

class SupplierMotor extends React.Component {
	render(){
		return (
			<div>
				<h4 className="page-title">Supplier Motor</h4>
				<small>Lorem ipsum dolor sit amet.</small>	
				<hr/>
				<div className="row">
					<div className="col-sm-8">
						<button className="btn btn-primary btn-sm"><i className="glyph-icon icon-plus"></i> Tambah Supplier</button>
					</div>
					<div className="col-sm-4">
						<input type="text" className="form-control input-sm" placeholder="filter text"/>
					</div>
				</div>
				
				<hr/>
				<div className="row">
					<div className="col-sm-3"><strong>Daftar Master</strong></div>
					<div className="col-sm-4"><strong>Tipe</strong></div>
					<div className="col-sm-5"><strong>Detail</strong></div>
				</div>
				<br/>
				<div className="row">
					<div className="col-sm-3">
						<select name="" id="" className="form-control input-sm" multiple={true}>
							<option value="1">Supplier</option>
							<option value="1">Sales</option>
							<option value="1">Spare Part</option>
						</select>
					</div>
					<div className="col-sm-3">
						<select name="" id="" className="form-control input-sm">
							<option value="">Motor</option>
							<option value="">SparePart</option>							
						</select>

						<select name="" id="" className="form-control input-sm" multiple={true} style={{ 'marginTop':'15px' }}>
							<option value="1">Dharma Motor</option>
							<option value="1">Eka Motor</option>
							<option value="1">Surya Jaya</option>
						</select>
												
					</div>
					<div className="col-sm-1">
						<button className="btn btn-sm btn-primary">Add</button>
					</div>
					<div className="col-sm-5">
						<form action="" className="form-horizontal">
							<div className="form-group">
								<label htmlFor="" className="col-sm-4 input-sm"><strong>Nama Supplier</strong></label>
								<div className="col-sm-8">
									<input type="text" className="form-control input-sm"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="" className="col-sm-4 input-sm"><strong>Alamat</strong></label>
								<div className="col-sm-8">
									<input type="text" className="form-control input-sm"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="" className="col-sm-4 input-sm"><strong>No. Telpon</strong></label>
								<div className="col-sm-8">
									<input type="text" className="form-control input-sm"/>
								</div>
							</div>
						</form>
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-sm-12">

						<table width="100%" className="table table-hover table-condensed font-size-12">
							<thead>
								<tr>
									
									<th colspan="2">NAMA SUPPLIER</th>
									<th>ALAMAT</th>
									<th colspan="2">NO TELPON</th>
									
								</tr>
							</thead>
							<tbody>
								<tr>
									<td width="1%">
										<input type="checkbox"/>
									</td>
									<td>SURYA DHARMA MOTOR</td>
									<td>JL. MOH TAHIR BTN JONGAYA INDAH</td>
									<td>085242068765</td>
									<td>
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-search"></i></button>&nbsp;
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-eye"></i></button>&nbsp;
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-remove"></i></button>
									</td>
								</tr>
								<tr>
									<td width="1%">
										<input type="checkbox"/>
									</td>
									<td>SURYA DHARMA MOTOR</td>
									<td>JL. MOH TAHIR BTN JONGAYA INDAH</td>
									<td>085242068765</td>
									<td>
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-search"></i></button>&nbsp;
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-eye"></i></button>&nbsp;
										<button className="btn btn-default btn-xs"><i className="glyph-icon icon-remove"></i></button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export { SupplierMotor };