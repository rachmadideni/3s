import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Alert, Form, Button, Input, Steps } from 'antd';

//const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Step = Steps.Step;

class App extends Component {
  
   state = {
       collapsed: false,
       current: 'mail',
   };

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

  render() {
    return (

      <Layout>
           <Sider width = { 200 } trigger = { null } collapsible collapsed={ true } style={{ paddingTop:10 }}>
               {/*<div className = "logo" />*/}
               <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>                     
                     <Menu.Item key ="3" ><Icon size="large" type="home" /><span>Home</span></Menu.Item>
                     <Menu.Item key ="4" ><Icon size="large" type="plus" /><span>Mulai Transaksi</span></Menu.Item>
                     <Menu.Item key ="5" ><Icon size="large" type="book" /><span>nav 3</span></Menu.Item>
               </Menu>
           </Sider>
           <Sider width={250} collapsible collapsed = { this.state.collapsed } style={{ paddingRight:15 }}>
              <div className = "logo" />

              <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>                                          
                     <Menu.Item key ="3" ><Icon type="ellipsis" /><span>Overview</span></Menu.Item>
                     <Menu.Item key ="4" ><Icon type="book" /><span>Order Parts</span></Menu.Item>
                     <Menu.Item key ="5" ><Icon type="upload" /><span>History</span></Menu.Item>
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
                               <Alert type = "success" message = "hi im alert message" banner = { false } showIcon = { true } closable = { true } />                           
                               <Form layout="vertical">
                                  <Form.Item label="title">
                                     <Input name="title" />
                                  </Form.Item>
                                  <Form.Item>
                                     <Input name="title" placeholder="dasdsadsada"/>
                                  </Form.Item>
                               </Form>
                               {/*}
                               <Steps size="large" current={1}>
                                <Step title="Finished" description="Complete user Profile" icon={<Icon type="check" />} />
                                <Step title="In Progress" description="Billing Information" icon={<Icon type="user" />} />
                                <Step title="Waiting" description="This is a description." icon={<Icon type="user" />} />
                              </Steps>*/}
                          </Col>
                          </Row>                      
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