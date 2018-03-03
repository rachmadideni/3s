import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const { Sider } = Layout;

/*
mau di buatkan prop types validasi
props.width
props.data
props.collapsed
*/

/*Sidebar.propTypes = {
    width: PropTypes.number,
    data: PropTypes.array,
    collapsed: PropTypes.bool
}*/

const Sidebar = (props) => {
  
	  let menu = props.data;
	  
	  return (

	      <Sider 
	      	width = { 200 }
	      	trigger = { null } 
	      	collapsible 
	      	collapsed={ true } 
	      	style={{ paddingTop: 10 }}>
	           <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>
	            { menu.map((dt, index) => (
	              <Menu.Item key = { dt.key }>
	              <Link to = { dt.url }><Icon type= { dt.icon }/><span>{ dt.text }</span></Link>
	              </Menu.Item>
	            ))}
	           </Menu>
	       </Sider>

	  );

}



export { Sidebar };