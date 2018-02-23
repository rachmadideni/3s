import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/antd/dist/antd.css';
import './Ant-custom.css';

// import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes';
//import Login from './Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store = { store }>
		<AppRoutes />
	</Provider>, document.getElementById('root'));
registerServiceWorker();