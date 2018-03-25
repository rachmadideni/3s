import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';
// const { Sider } = Layout;

import { InputCustomer } from '../customer';

class Tunai extends Component{
	render(){
		return (			 
			<Row style={{ background:'#FFF' }}>
				
				<Col span={24}>
					
					<Form layout="vertical">

						<InputCustomer />
					
						<Row style={{ padding:0,marginBottom:5}}>
							<Col span={1}></Col>
							<Col span={4}><strong>Data Pelanggan</strong></Col>
						</Row>
					
						<Row style={{ padding:0,marginTop:0,marginBottom:15}}>
							<Col span={1}></Col>
							<Col span={10}><small>Dilengkapi dengan data Pelanggan</small></Col>
						</Row>
					
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Nama Lengkap</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input name="title" placeholder="" value = "" />
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Alamat Lengkap</Col>
							<Col span={8}>						                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input name="title" placeholder="" value = "" />
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Nomor Telpon</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input name="title" placeholder="" value = "" />
								</Form.Item>					
							</Col>
						</Row>

						<Row style={{ padding:0,marginTop:10,marginBottom:5}}>
							<Col span={1}></Col>
							<Col span={4}><strong>Data Kendaraan</strong></Col>
						</Row>
						
						<Row style={{ padding:0,marginTop:0,marginBottom:15}}>
							<Col span={1}></Col>
							<Col span={10}><small>Dilengkapi dengan data kendaraan sesuai Pesanan</small></Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Merk</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Select name="" id="">
										<option value="1">Yamaha</option>
										<option value="2">Honda</option>
										<option value="3">Suzuki</option>
										<option value="4">Kawasaki</option>
									</Select>
								</Form.Item>					
							</Col>
						</Row>
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Tipe</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Select name="" id="">
										<option value="1">Yamaha Rx King</option>
										<option value="2">Yamaha Scooter Mio</option>
									</Select>
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Warna</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Select name="" id="">
										<option value="1">Black</option>
										<option value="2">Yellow</option>
									</Select>
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Tahun</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input></Input>
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={2}></Col>
							<Col span={4} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Jenis Harga</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Select name="" id="">
										<option value="1">On The Road</option>
										<option value="2">Off The Road</option>
									</Select>
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={1}></Col>
							<Col span={5} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Harga</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input name="title" placeholder="" value = "" />
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={1}></Col>
							<Col span={5} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}>Uang Muka</Col>
							<Col span={8}>							                                  
								<Form.Item style={{ padding:0,margin:8 }}>
									<Input name="title" placeholder="" value = "" />
								</Form.Item>					
							</Col>
						</Row>
						
						<Row style={{ padding:0,margin:0}}>
							<Col span={1}></Col>
							<Col span={5} style={{ textAlign:'right',paddingTop:10,paddingRight:10 }}></Col>
							<Col span={8}>
								<Form.Item style={{ padding:0,margin:8 }}>					                                  
									<Button type="primary">Submit</Button>
								</Form.Item>			
							</Col>
						</Row>

					</Form>
				</Col>
				<Col span={6}>
			{/*
				<Sider trigger = { null } collapsible collapsed={ true } style={{ paddingTop:10 }}>               
		          <Content>dsadsa</Content>
		       </Sider>*/}
		       </Col>
			</Row>
		);
	}
}

export { Tunai };