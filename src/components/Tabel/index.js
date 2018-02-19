import React, { Component,PropTypes } from 'react';

export default class Tabel extends Component {
	constructor(props) {
	  super(props);	  
	}

	render(){
		return (
			<table className={this.props.customstyle}>
				<thead>
				<tr>{ this.props.header.map((header)=>{ return (<th>{header}</th>) } )}</tr>
				</thead>
				<tbody>				
				{ this.props.row.map( (row)=>{ 
					return (
						<tr key={row.idinvo}>
						{ 
							Object.keys(row).map( data => {
								return (
									<td>{row[data]}</td>								
								)	
							})					
						}
						</tr>
					)
				})}
				
				</tbody>
			</table>
		);
	}
}

/*Tabel.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object),
  row: PropTypes.arrayOf(PropTypes.object)
}*/
