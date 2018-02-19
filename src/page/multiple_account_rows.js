import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var NumberFormat = require('react-number-format');

class MultipleRows extends Component {

    constructor(props){
      super(props);
    }

    render(){
      return(
        <div>
          <Select
              name="kdacct"
              options = { this.state.data_supplier }
              value = { this.state.selectedSupplier }
              onChange = { this._onChangeSupplier.bind(this) }
              clearable = { false } />
        </div>
      )
    }

}
