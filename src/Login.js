import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const { Content } = Layout;

class LoginForm extends Component{

	handleSubmit = (e) => {
    	e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	        if (!err) {
	            console.log('Received values of form: ', values);
	        }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<Layout>
			<Content style={{ paddingTop: '150px',background: '#fff' }} >
				<Row gutter={8}>
					<Col span={9}></Col>
					<Col span={5}>
						<h1 style={{ textAlign:'center' }}>3S</h1>
					</Col>
					<Col span={7}></Col>	
				</Row>
				<Row gutter={8}>
				 <Col span={9}></Col>
                 <Col span={5}>
					<Form onSubmit = { this.handleSubmit } className = "login-form">

				        <FormItem>
				          {getFieldDecorator('userName', { rules: [{ required: true, message: 'Please input your username!' }],})(
				          	<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" /> )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: 'Please input your Password!' }],
				          })(
				            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('remember', {
				            valuePropName: 'checked',
				            initialValue: true,
				          })(
				            <Checkbox>Remember me</Checkbox>
				          )}
				          <a className="login-form-forgot" href="">Forgot password</a>
				          <Link to="/">
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            Log in
				          </Button>
				          </Link>
				          &nbsp;&nbsp;Or <a href="">register now!</a>
				        </FormItem>

				      </Form>
				</Col>
				<Col span={7}></Col>
			  </Row>
	      </Content>
	      </Layout>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;