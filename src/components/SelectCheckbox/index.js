import React, { Component } from 'react';
import { Trigger, Select, Manager, OptionList, Option } from 'react-aria'

export default class SelectMenu extends Component {
  state = {
    selection: null
  }

  _handleSelection = (item, e) => {
    this.setState({
      selection: item.value,
      isOpen: false
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <Manager>
        <Trigger
          controls="select-menu"
          type="menu"
          isOpen={isOpen}
          onToggle={() => this.setState({ isOpen: !isOpen })}
        >
          {this.state.selection || 'Select A Dropdown Item'}
        </Trigger>
        { isOpen &&
          <OptionList
            id="select-menu"
            onOptionSelection={this._handleSelection}
            onRequestClose={() => this.setState({ isOpen: false })}
          >
            <Option value="apples">Apples</Option>
            <Option value="pears">Pears</Option>
            <Option value="oranges">Oranges</Option>
          </OptionList>
        }
      </Manager>
    )
  }
}