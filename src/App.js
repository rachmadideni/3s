import React, { Component  } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMessage } from './actions/message';
import { bindActionCreators } from 'redux';

import { Layout, Menu, Icon, Row, Col, Form, Input } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { TopHeader } from './page/ui';
import { Tunai,Kredit } from './page/penjualan';
import { dt as menu } from './data/sidebar';

const { Header, Content, Sider } = Layout;



const routes = [{
    path: "/app/sales/tunai",
    exact: true,
    main: () => <Tunai />
}, {
    path: "/app/sales/kredit",
    exact: true,
    main: () => <Kredit />
}];

class TopLeft extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      collapsed: false,
      current: 'mail',
      selectedPrimary: ''
    };
  }

  toggle = () => {
       this.setState({
           collapsed: !this.state.collapsed,
       });
   }

  handleClick = (e) => {
      this.setState({
          current: e.key,
      });
  }

  render(){
    return (
        <Router>

            <Layout>
                              
               <Primarysidebar collapsed = { true } data = { menu.primary } />
               <Secondarysidebar collapsed = { this.state.collapsed } data = { menu.secondary } />

               <Layout>
                    <TopHeader />
                   {/*
                   <Header style={{ background: '#fff', padding: 0 }}>
                       <Row gutter={8}>
                         <Col span={16}>
                             <Icon className = "trigger" type = { this.state.collapsed ? 'menu-unfold' : 'menu-fold' } onClick = { this.toggle } />
                         </Col>
                         <Col span = { 6 }>
                             <Menu onClick = { this.handleClick } selectedKeys = {[this.state.current]} mode = "horizontal">                              
                                  <Menu.Item key ="mail">Mailbox </Menu.Item>
                                  <Menu.Item key ="chat">User Preferences </Menu.Item>
                             </Menu>     
                         </Col>                              
                       </Row>
                   </Header>
                   */}
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 535 }}>
                     <Layout>                       
                        {
                          routes.map((route, index) => (
                            <Route
                              key = { index } 
                              path = { route.path } 
                              exact = { route.exact } 
                              component = { route.main } />
                          ))
                        }
                     </Layout>
                    </Content>
                </Layout>
            </Layout>
        </Router>      
    );
  }
}

const Primarysidebar = (props) => {
  let menu = props.data;
  return (
      <Sider width = { 200 } trigger = { null } collapsible collapsed={ true } style={{ paddingTop:10 }}>               
           <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>
            {menu.map((dt,index)=>(
              <Menu.Item key = { dt.key } > <Link to={dt.url}><Icon type={dt.icon}/><span>{dt.text}</span></Link> < /Menu.Item>
            ))}
           </Menu>
       </Sider>
  );
}

const Secondarysidebar = (props) => {
  let menu = props.data;
  return (
      <Sider width = { 250 } collapsible collapsed = { props.collapsed } style = {{ paddingRight: 15 }}>
          <div className = "logo" />
          <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['0']}>
            {menu.map((dt,index)=>(
              <Menu.Item key = { dt.key } > <Link to={dt.url}><Icon type="right-square"/><span>{dt.text}</span></Link> < /Menu.Item>
            ))}                        
           </Menu>
       </Sider>
  )
}

class Sidebar2 extends Component{
  /* 
  props.collapsed
  props.key
  props.url
  props.text
  */
  render(){
    return (
        <Sider width = { 250 } collapsible collapsed = { this.props.collapsed } style = {{ paddingRight: 15 }}>
            <div className = "logo" />
            <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['0']}>
             <Menu.Item key ="1" ><Link to="/app/sales/tunai"><Icon type="right-square"/><span>Tunai</span></Link></Menu.Item>
             <Menu.Item key ="2" ><Link to="/app/sales/kredit"><Icon type="right-square" /><span>Kredit</span></Link></Menu.Item>             
             </Menu>
         </Sider>    
    );
  }
}



class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      collapsed: false,
       current: 'mail'
    };
  }   

   toggle = () => {
       this.setState({
           collapsed: !this.state.collapsed,
       });
   }

   handleClick = (e) => {

       // console.log('click ', e);
       this.setState({
           current: e.key,
       });
   }

   ChangeInput = (e) => {
      this.props.dispatch(setMessage(e.target.value));
      // const val = this.props;
      // console.log(val);
   }   

  render() {
    
    // const { message } = this.props.messageReducer;    

    return (
      <Layout>

           <Sider width = { 200 } trigger = { null } collapsible collapsed={ true } style={{ paddingTop:10 }}>               
               <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>                     
                     <Menu.Item key ="3" ><Icon size="large" type="home" /><span>Home</span></Menu.Item>
                     <Menu.Item key ="4" ><Icon size="large" type="plus" /><span>Sales</span></Menu.Item>
                     <Menu.Item key ="5" ><Icon size="large" type="book" /><span>Services</span></Menu.Item>
                     <Menu.Item key ="6" ><Icon size="large" type="book" /><span>SpareParts</span></Menu.Item>
               </Menu>
           </Sider>
           <Sider width={250} collapsible collapsed = { this.state.collapsed } style={{ paddingRight:15 }}>
              <div className = "logo" />
              <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>                                          
                     <Menu.Item key ="1" ><Icon type="user" /><Link to="/app/mod_sales/tunai"><span>Tunai</span></Link></Menu.Item>
                     <Menu.Item key ="2" ><Icon type="user" /><Link to="/app/mod_sales/kredit"><span>Kredit</span></Link></Menu.Item>
                     <Menu.Item key ="3" ><Icon type="user" /><span>Account</span></Menu.Item>                     
                     <Menu.Item key ="5" ><Icon type="upload" /><span>Logout</span></Menu.Item>
               </Menu>
           </Sider>

           <Layout>

               <Header style={{ background: '#fff', padding: 0 }}>
                   <Row gutter={8}>
                     <Col span={16}>
                         <Icon className = "trigger" type = { this.state.collapsed ? 'menu-unfold' : 'menu-fold' } onClick = { this.toggle } />
                     </Col>
                     <Col span = { 6 }>
                         <Menu onClick = { this.handleClick } selectedKeys = {[this.state.current]} mode = "horizontal">                              
                              <Menu.Item key ="mail">Mailbox </Menu.Item>
                              <Menu.Item key ="chat">User Preferences </Menu.Item>
                         </Menu>     
                     </Col>                              
                   </Row>
               </Header>

               <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 535 }}>
                     <Layout>                        
                        <Header style={{ background: '#fff' }}>
                           <Row>
                              <Col span={2}></Col>
                              <Col span={18}><h3 style={{ padding:0}}>HEADER</h3></Col>
                           </Row> 
                        </Header>
                        <Content style={{ background:'#fff' }}>
                          <Row>
                              <Col span={2}></Col>
                              <Col span={18}>
                                   {/*<Alert type = "success" message = "hi im alert message" banner = { false } showIcon = { true } closable = { true } />*/}                           
                                   <Form layout="vertical">                                  
                                      <Form.Item>
                                         <Input name="title" placeholder="test input" value = "" onChange={this.ChangeInput.bind(this)}/>
                                      </Form.Item>
                                   </Form>                               
                              </Col>
                          </Row>                      
                        </Content>
                     </Layout>
               </Content>              

           </Layout>

      </Layout>
      
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(setMessage, dispatch) }
}

// export default App;
export default connect(mapDispatchToProps)(TopLeft);