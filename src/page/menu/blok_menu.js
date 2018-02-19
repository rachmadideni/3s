import React, { Component } from 'react';

class BlockMenu extends Component{
	render(){
		return(
			<div className="example-box-wrapper">
				<div className="row mrg20B">
	            	<div className="col-md-2 col-md-offset-3">		              
			              <a href = "" className = "tile-box tile-box-shortcut btn-success">			              		
			              		<div className = "tile-header" > SALES </div>			              		
			              		<div className = "tile-content-wrapper" >
			              			<i className = "glyph-icon icon-line-chart" >< /i>
			              		</div>
			              </a>
	            	</div>
	            	<div className="col-md-2">		              
			              <a href = "" className = "tile-box tile-box-shortcut btn-primary">			              		
			              		<div className = "tile-header" > PURCHASE ORDER < /div>
			              		<div className = "tile-content-wrapper" >
			              			<i className = "glyph-icon icon-list-ul" >< /i>
			              		</div>
			              </a>
	            	</div>
	            	<div className="col-md-2">		              
			              <a href = "" className = "tile-box tile-box-shortcut btn-warning">			              		
			              		<div className = "tile-header"> TAGIHAN < /div>
			              		<div className = "tile-content-wrapper">
			              			<i className = "glyph-icon icon-external-link" >< /i>
			              		</div>
			              </a>
	            	</div>
	          	</div>	          	          	

          	</div>
		);
	}
}

export { BlockMenu };