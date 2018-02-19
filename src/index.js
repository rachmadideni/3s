import React from 'react';
import ReactDOM from 'react-dom';
//import './bootstrap/css/bootstrap.css';
//import './datepicker/react-datepicker.css';

// import { Supplier } from './page/supplier';
// import { PurchaseOrder } from './page/purchase_order';
// import { Sidebar,BlockMenu } from './page/menu';
// import { Tunai } from './page/penjualan';

import App from './App';
import Login from './Login';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
