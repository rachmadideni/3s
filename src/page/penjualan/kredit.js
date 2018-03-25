import React, { Component } from 'react';
import {Row,Form,Col,Input} from 'antd';

/*
	customer mau ambil kredit
	step : 
	nasabah : nama,umur,nama ibu kandung,alamat domisili,alamat saudara tidak 1 domisili,atas nama di stnk
	kendaraan : type motor, warna motor.
	alamat pengiriman : sama dengan alamat domisili

	pada saat pengisian jenis penjualan
	jika data nasabah sudah ada sebelumnya admin tinggal memilih data dari database
	jika belum data nasabah diinput ke form terpisah dari form penjualan (tunai/kredit)

*/

const FormLegend = (props)=> {
	return(	
		<div>	
			<Row>
				<Col span={ 1 }></Col>
				<Col span={ 4 }><strong>{ props.title }</strong></Col>
			</Row>
			<Row style = { styles.rowDesc } >
				<Col span={1}></Col>
				<Col span={10}><small>{props.description}</small></Col>
			</Row>
		</div>
	);
}

const styles = {
	row:{
		padding:0,
		margin:0
	},
	rowDesc:{
		padding:0,
		marginTop:0,
		marginBottom:15
	},
	colDesc:{
		textAlign:'right',
		paddingTop:10,
		paddingRight:10
	},
	formItem:{
		padding:0,
		margin:8
	}
}

class Kredit extends Component{
	render(){
		return (
			<Row style={{ background:'#FFFFFF'}}>
				<Col span={24}>
					<Form layout="vertical">

						<FormLegend title={"HEADER 1"} description = { "HEADER 1" } />
						<Row>
							<Col span={1}></Col>						
							<Col span={4} style = { styles.colDesc }>Nama Lengkap</Col>
							<Col span={8}>							                                  
								<Form.Item style = { styles.formItem }>
									<Input name="title" placeholder="" value = ""/>
								</Form.Item>					
							</Col>
						</Row>

						<Row>
							<Col span={1}></Col>						
							<Col span={4} style = { styles.colDesc }>Nama Lengkap</Col>
							<Col span={8}>							                                  
								<Form.Item style = { styles.formItem }>
									<Input name="title" placeholder="" value = ""/>
								</Form.Item>					
							</Col>
						</Row>

						<Row>
							<Col span={1}></Col>						
							<Col span={4} style = { styles.colDesc }>Nama Lengkap</Col>
							<Col span={8}>							                                  
								<Form.Item style = { styles.formItem }>
									<Input name="title" placeholder="" value = ""/>
								</Form.Item>					
							</Col>
						</Row>

					</Form>
				</Col>
			</Row>
		);
	}
}

export { Kredit };