import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col, Icon } from 'antd';

const { Header } = Layout;


class TopHeader extends Component {
	
	static propTypes = {
		collapsed:PropTypes.bool
	};

	constructor(props) {
	  super(props);	
	  this.state = {
	  	collapsed:true
	  };
	}

	Toggle(){
		this.setState({
			collapsed:!this.state.collapsed
		})
	}
	render(){
		return (
			<Header style={{ background: '#fff', padding: 0 }}>
	           <Row gutter={8}>
	             <Col span={16}>
	                 <Icon className = "trigger" type = { this.props.collapsed ? 'menu-unfold' : 'menu-fold' } onClick = { this.Toggle.bind(this) } />
	             </Col>
	             <Col span = { 6 }>
	             {/*}
	                 <Menu onClick = { this.handleClick } selectedKeys = {[this.state.current]} mode = "horizontal">                              
	                      <Menu.Item key ="mail">Mailbox </Menu.Item>
	                      <Menu.Item key ="chat">User Preferences </Menu.Item>
	                 </Menu>
	             */}     
	             </Col>                              
	           </Row>
	       </Header>		
		);
	}
}

export { TopHeader }
