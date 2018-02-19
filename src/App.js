import React, { Component } from 'react';
// import Button from 'antd/lib/button';

import { Layout, Menu, Icon, Row, Col, Button, Alert, Avatar,Form, Input, Steps } from 'antd';
import '../node_modules/antd/dist/antd.css';

// import './App.css';
import './Ant-custom.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Step = Steps.Step;



class App extends Component {
  
   state = {
       collapsed: true,
       current: 'mail',
   };

   toggle = () => {
       this.setState({
           collapsed: !this.state.collapsed,
       });
   }

   handleClick = (e) => {
       console.log('click ', e);
       this.setState({
           current: e.key,
       });
   }

  render() {
    return (

      <Layout>
           <Sider width = { 200 } trigger = { null } collapsible collapsed = { this.state.collapsed }>
               <div className = "logo" />
               <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>                     
                     <Menu.Item key ="3" ><Icon type="user" /><span>nav 1</span></Menu.Item>
                     <Menu.Item key ="4" ><Icon type="video-camera" /><span>nav 2</span></Menu.Item>
                     <Menu.Item key ="5" ><Icon type="upload" /><span>nav 3</span></Menu.Item>
               </Menu>
           </Sider>

           <Layout>
               <Header style={{ background: '#fff', padding: 0 }}>
                   <Row gutter={8}>
                     <Col span={16}>
                         <Icon className = "trigger" type = { this.state.collapsed ? 'menu-unfold' : 'menu-fold' } onClick = { this.toggle } />
                     </Col>
                     <Col span = { 8 }>
                         <Menu onClick = { this.handleClick } selectedKeys = {[this.state.current]} mode = "horizontal">                              
                                <Menu.Item key ="mail"><Icon type= "mail" /> Mailbox </Menu.Item>
                                <Menu.Item key ="chat"><Icon type= "user" /> User Preferences </Menu.Item>
                         </Menu>     
                     </Col>                              
                   </Row>
               </Header>

               <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 535 }}>
                     <Layout>                        
                        <Header style={{ background: '#fff' }}>
                           <Row>
                              <Col>header</Col>
                           </Row> 
                        </Header>
                        <Content style={{ background:'#fff' }}>                        
                           <Alert type = "success" message = "hi im alert message" banner = { false } showIcon = { true } closable = { true } />
                           {/*<Avatar shape = "circle" size = "small" icon = "mail" />*/}
                           <Form>
                              <Form.Item label="title">
                                 <Input name="title" />
                              </Form.Item>
                           </Form>
                           <Steps size="small" current={1}>
                            <Step title="Finished" description="Complete user Profile" icon={<Icon type="check" />} />
                            <Step title="In Progress" description="Billing Information" icon={<Icon type="user" />} />
                            <Step title="Waiting" description="This is a description." icon={<Icon type="user" />} />
                          </Steps>                      
                        </Content>
                     </Layout>
               </Content>

               <Content>

               </Content>

           </Layout>

      </Layout>
      
    );
  }
}

export default App;