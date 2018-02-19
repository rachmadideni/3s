import React, { Component } from 'react';

class Sidebar extends Component{
	render(){
		return(
			<div id="page-sidebar" style={{ height:1650 }}>
            	<div className="scroll-sidebar" style={{ height:1650 }}>
	              <ul id="sidebar-menu">
	                  <li className="header"><span>SALES DIVISION</span></li>
	                  <li><a href="#"><i className="glyph-icon icon-cubes"></i><span>Penjualan</span></a></li>
	                  <li><a href="#"><i className="glyph-icon icon-cubes"></i><span>Pesanan Pembelian</span></a></li>
	                  <li><a href="#"><i className="glyph-icon icon-cubes"></i><span>Penagihan</span></a></li>	                                   

	              </ul>
            	</div>
          	</div>
		);
	}
}

export { Sidebar };