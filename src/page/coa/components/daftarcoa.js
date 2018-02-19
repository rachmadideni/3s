import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
var NumberFormat = require('react-number-format');

export default class DaftarCoa extends Component{
     constructor(props) {
       super(props);     
       this.state = {
          ds:[],
          keyword:''
       };
     }

     componentDidMount(){
          var _this = this;
          //var idprnt = this.props.idprnt;
          axios.get(`http://localhost:3004/balian/coa/list`)
          .then(function (response){                             
               _this.setState({
                    ds: response.data
               })
               //console.log(response.data);
          }).catch(function (err){
               console.log(err);
          });
     }

     _handleKeyword = (e) => {
          this.setState({
               keyword:e.target.value
          })
     }

	render(){

          const coa = this.state.ds.filter((keyword)=>{ return keyword.label.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1; })

		return (			
			<div className="row">
                    <div className="col-md-12">
                         <input type="text" className="form-control input-sm" placeholder="keyword" value={this.state.keyword} onChange={this._handleKeyword}/>
                    </div>
                <div className="col-md-12">
					<h5><strong><i className="glyph-icon icon-list-alt"></i>  DAFTAR REKENING</strong></h5>
                    <ReactTooltip id='update_rekening' place="top" type="dark" effect="float"><span>update rekening</span></ReactTooltip>
                    <table className="table table-condensed table-hover font-size-12">
                    	<thead>
                    		<tr>
                    			<th style={{ width:'1%' }}>NO</th>
                    			<th style={{ width:'7%' }}>GROUP</th>
                    			<th style={{ width:'4%' }}>KODE</th>
                    			<th style={{ width:'20%' }}>NAMA</th>
                                   <th style={{ width:'10%' }} className="text-center">SALDO</th>
                    			<th style={{ width:'20%' }} className="text-center">ACTION</th>
                    		</tr>
                    	</thead>
                    	<tbody>
                         {coa.map((coa)=>{
                              var link_update_coa = '/update/coa/' + coa.value +'';
                              var link_setting_saldo = '/input/saldo/' + coa.value + '';
                         return (
                              <tr key={coa.value}>
                                   <td></td>
                                   <td>{ coa.HVCHLD === 'Y' ? coa.label : "" }</td>
                                   <td>{coa.KDACCT}</td>
                                   <td>{ coa.HVCHLD === 'T' ? coa.label : "" }</td>
                                   <td className="text-right"><NumberFormat displayType={'text'} value={coa.SALDO} thousandSeparator={true} decimalSeparator={'.'} decimalPrecision={2} />
                                   </td>
                                   <td className="text-center"> { coa.HVCHLD ==='T' ? <div>
                                   
                                   <Link to={link_update_coa} className="btn btn-xs btn-success" data-tip data-for='update_rekening'><i className="glyph-icon icon-list-alt"></i></Link>
                                   &nbsp;
                                   <Link to={link_setting_saldo} className="btn btn-xs btn-info" data-tip='update saldo'><i className="glyph-icon icon-list-alt"></i></Link></div>  : "" }</td>                                  
                              </tr>
                         )
                         })}                                             		
                    	</tbody>
                    </table>
                    
                </div>
            </div>
		);
	}
}