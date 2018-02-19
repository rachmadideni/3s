import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/antd/dist/antd.css';
import './Ant-custom.css';

import App from './App';
//import Login from './Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();