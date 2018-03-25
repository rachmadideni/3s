import React, { Component  } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMessage } from './actions/message';
import { bindActionCreators } from 'redux';

import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { TopHeader } from './page/ui';
import { Tunai,Kredit } from './page/penjualan';
import { dt as menu } from './data/sidebar';

const { Content, Sider } = Layout;



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

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(setMessage, dispatch) }
}

// export default App;
export default connect(mapDispatchToProps)(TopLeft);